import React from 'react';
import { X, Calendar, MapPin, Trash2, ArrowRight, Bookmark } from 'lucide-react';
import { SavedTrip } from '../types';
import { formatCurrency } from '../utils/currency';

interface SavedTripsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedTrips: SavedTrip[];
  onSelectTrip: (trip: SavedTrip) => void;
  onDeleteTrip: (id: string) => void;
}

export const SavedTripsModal: React.FC<SavedTripsModalProps> = ({
  isOpen,
  onClose,
  savedTrips,
  onSelectTrip,
  onDeleteTrip
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-[#E8E2D9] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#E8E2D9] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1E232A] text-white flex items-center justify-center">
              <Bookmark className="w-5 h-5 text-[#E8DFD1]" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-semibold text-[#1E232A]">Saved Trip Library</h3>
              <p className="text-xs text-[#6B7280]">Access your saved personalized travel plans</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white border border-[#E8E2D9] flex items-center justify-center text-[#1E232A] hover:bg-[#F3EFEA] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {savedTrips.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <Bookmark className="w-10 h-10 text-[#6B7280] mx-auto opacity-50" />
              <p className="font-serif text-lg text-[#1E232A]">No saved itineraries yet</p>
              <p className="text-xs text-[#6B7280] max-w-sm mx-auto">
                Generate an itinerary and click "Save Itinerary" to store your favorite plans for future reference.
              </p>
            </div>
          ) : (
            savedTrips.map((trip) => (
              <div
                key={trip.id}
                className="p-5 rounded-2xl border border-[#E8E2D9] bg-white hover:border-[#1E232A] transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#1E232A] text-white">
                      {trip.plan.destination}
                    </span>
                    <span className="text-[11px] text-[#6B7280]">
                      Saved {new Date(trip.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h4 className="font-serif text-lg font-bold text-[#1E232A]">
                    {trip.plan.numDays}-Day {trip.plan.destination} Journey
                  </h4>

                  <div className="flex items-center gap-4 text-xs text-[#4B5563]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#C85A32]" />
                      {trip.plan.startDate} to {trip.plan.endDate}
                    </span>
                    <span>•</span>
                    <span className="font-semibold text-[#1E232A]">
                      {formatCurrency(trip.plan.totalCostSGD, trip.plan.currency || 'SGD')} / {formatCurrency(trip.plan.budgetSGD, trip.plan.currency || 'SGD')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-0 border-[#F3EFEA]">
                  <button
                    onClick={() => {
                      onSelectTrip(trip);
                      onClose();
                    }}
                    className="flex items-center gap-1 px-4 py-2 rounded-full bg-[#1E232A] text-white text-xs font-medium hover:bg-[#323842] transition-all"
                  >
                    <span>Load Plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onDeleteTrip(trip.id)}
                    className="p-2 rounded-full border border-[#E8E2D9] text-[#9B1C1C] hover:bg-[#FDF2F2] transition-colors"
                    title="Delete saved trip"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

