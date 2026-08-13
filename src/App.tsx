/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PlanningForm } from './components/PlanningForm';
import { ItineraryResults } from './components/ItineraryResults';
import { EmptyOrEdgeState } from './components/EmptyOrEdgeState';
import { SavedTripsModal } from './components/SavedTripsModal';
import { DisqusComments } from './components/DisqusComments';
import { ActivityCategory, ItineraryPlan, SavedTrip, TripFormData } from './types';
import { generateItinerary } from './utils/itineraryPlanner';

const LOCAL_STORAGE_KEY = 'voyageur_saved_trips_v1';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<'form' | 'results' | 'empty_edge'>('form');
  const [formData, setFormData] = useState<TripFormData | null>(null);
  const [plan, setPlan] = useState<ItineraryPlan | null>(null);
  const [savedTrips, setSavedTrips] = useState<SavedTrip[]>([]);
  const [isSavedTripsModalOpen, setIsSavedTripsModalOpen] = useState(false);

  // Load saved trips from localStorage on initial render
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        setSavedTrips(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to parse saved trips from localStorage:', e);
    }
  }, []);

  // Save trips helper
  const handleSaveTrip = (planToSave: ItineraryPlan) => {
    if (!formData) return;

    const existingIndex = savedTrips.findIndex(
      t => t.plan.destination === planToSave.destination && t.plan.startDate === planToSave.startDate
    );

    let updated: SavedTrip[];
    if (existingIndex >= 0) {
      updated = [...savedTrips];
      updated[existingIndex] = {
        id: savedTrips[existingIndex].id,
        createdAt: new Date().toISOString(),
        formData,
        plan: planToSave
      };
    } else {
      const newTrip: SavedTrip = {
        id: `trip-${Date.now()}`,
        createdAt: new Date().toISOString(),
        formData,
        plan: planToSave
      };
      updated = [newTrip, ...savedTrips];
    }

    setSavedTrips(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to write to localStorage:', e);
    }
  };

  // Delete saved trip
  const handleDeleteTrip = (id: string) => {
    const updated = savedTrips.filter(t => t.id !== id);
    setSavedTrips(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to write to localStorage:', e);
    }
  };

  // Load a saved trip
  const handleSelectTrip = (saved: SavedTrip) => {
    setFormData(saved.formData);
    setPlan(saved.plan);
    setActiveScreen('results');
  };

  // Handle Form Submission
  const handleFormSubmit = (data: TripFormData) => {
    setFormData(data);
    const generatedPlan = generateItinerary(data);
    setPlan(generatedPlan);

    // If no activities were matched at all or critical empty state
    if (generatedPlan.emptyStateReason || (generatedPlan.totalCostSGD === 0 && generatedPlan.unfilledSlotsCount > 0)) {
      setActiveScreen('empty_edge');
    } else {
      setActiveScreen('results');
    }

    // Scroll top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Quick Action Fixes from Empty/Edge State
  const handleRaiseBudget = (newBudget: number) => {
    if (!formData) return;
    const updatedData: TripFormData = {
      ...formData,
      budgetSGD: newBudget
    };
    handleFormSubmit(updatedData);
  };

  const handleClearCategories = () => {
    if (!formData) return;
    const updatedData: TripFormData = {
      ...formData,
      preferences: []
    };
    handleFormSubmit(updatedData);
  };

  // Reset to form
  const handleReset = () => {
    setActiveScreen('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isCurrentPlanSaved = Boolean(
    plan &&
      savedTrips.some(
        t =>
          t.plan.destination === plan.destination &&
          t.plan.startDate === plan.startDate &&
          t.plan.totalCostSGD === plan.totalCostSGD
      )
  );

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E232A] flex flex-col font-sans">
      
      {/* Editorial Navigation Header */}
      <Header
        onReset={handleReset}
        savedTripsCount={savedTrips.length}
        onOpenSavedTrips={() => setIsSavedTripsModalOpen(true)}
        currentCurrency={plan?.currency || formData?.currency || 'SGD'}
        onCurrencyChange={(newCurrency) => {
          if (plan) {
            setPlan({ ...plan, currency: newCurrency });
          }
          if (formData) {
            setFormData({ ...formData, currency: newCurrency });
          }
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeScreen === 'form' && (
          <div className="animate-in fade-in duration-300">
            <PlanningForm
              onSubmit={handleFormSubmit}
              initialValues={formData || undefined}
            />
            <div className="max-w-4xl mx-auto px-4 mt-8">
              <DisqusComments
                title="Malaysia Travel Community Forum"
                pageIdentifier="malaysia-travel-general"
              />
            </div>
          </div>
        )}

        {activeScreen === 'results' && plan && (
          <div className="animate-in fade-in duration-300">
            <ItineraryResults
              plan={plan}
              onModifyForm={() => setActiveScreen('form')}
              onSaveTrip={handleSaveTrip}
              isTripSaved={isCurrentPlanSaved}
              onUpdatePlan={(updated) => setPlan(updated)}
            />
          </div>
        )}

        {activeScreen === 'empty_edge' && formData && (
          <div className="animate-in fade-in duration-300">
            <EmptyOrEdgeState
              reason={plan?.emptyStateReason}
              isBudgetDeficit={plan?.isBudgetDeficit}
              minBudgetNeededSGD={plan?.minBudgetNeededSGD}
              destinationName={formData.destination}
              numDays={plan?.numDays || 1}
              currentBudget={formData.budgetSGD}
              selectedCategories={formData.preferences}
              hasChildren={formData.hasChildren}
              onModifyForm={() => setActiveScreen('form')}
              onRaiseBudget={handleRaiseBudget}
              onClearCategories={handleClearCategories}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E8E2D9] bg-white py-8 text-center text-xs text-[#6B7280]">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-serif text-sm font-bold text-[#1E232A]">Voyageur Travel Guide</p>
          <p>Curated activity database for all 13 Malaysian States & Federal Territories • Multi-currency support (SGD, MYR, USD, EUR)</p>
        </div>
      </footer>

      {/* Saved Trips Drawer/Modal */}
      <SavedTripsModal
        isOpen={isSavedTripsModalOpen}
        onClose={() => setIsSavedTripsModalOpen(false)}
        savedTrips={savedTrips}
        onSelectTrip={handleSelectTrip}
        onDeleteTrip={handleDeleteTrip}
      />

    </div>
  );
}
