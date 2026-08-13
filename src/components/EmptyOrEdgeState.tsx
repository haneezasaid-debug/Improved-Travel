import React from 'react';
import { AlertTriangle, Lightbulb, RefreshCw, PlusCircle, Calendar, ArrowRight } from 'lucide-react';
import { ActivityCategory, DestinationId, TripFormData } from '../types';

interface EmptyOrEdgeStateProps {
  reason?: string;
  isBudgetDeficit?: boolean;
  minBudgetNeededSGD?: number;
  destinationName: string;
  numDays: number;
  currentBudget: number;
  selectedCategories: ActivityCategory[];
  hasChildren: boolean;
  onModifyForm: () => void;
  onRaiseBudget: (newBudget: number) => void;
  onClearCategories: () => void;
}

export const EmptyOrEdgeState: React.FC<EmptyOrEdgeStateProps> = ({
  reason,
  isBudgetDeficit,
  minBudgetNeededSGD,
  destinationName,
  numDays,
  currentBudget,
  selectedCategories,
  hasChildren,
  onModifyForm,
  onRaiseBudget,
  onClearCategories
}) => {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="bg-white rounded-3xl border-2 border-[#E8E2D9] p-8 sm:p-10 shadow-lg space-y-8 text-center relative overflow-hidden">
        
        {/* Editorial Accent Header */}
        <div className="w-16 h-16 rounded-full bg-[#FAF0EB] text-[#C85A32] flex items-center justify-center mx-auto shadow-inner">
          <AlertTriangle className="w-8 h-8 stroke-[1.75]" />
        </div>

        <div className="space-y-3 max-w-xl mx-auto">
          <span className="text-xs font-sans uppercase tracking-widest text-[#C85A32] font-semibold">
            Planner Diagnostic
          </span>
          <h2 className="font-serif text-3xl font-semibold text-[#1E232A] leading-tight">
            {isBudgetDeficit
              ? `Budget Constraint for ${destinationName}`
              : 'Adjustment Needed for Selected Filters'}
          </h2>
          <p className="text-sm text-[#4B5563] leading-relaxed">
            {reason ||
              (isBudgetDeficit
                ? `Your current budget of $${currentBudget} SGD is below the estimated baseline ($${minBudgetNeededSGD} SGD) required to cover activities for a ${numDays}-day trip in ${destinationName}.`
                : `No activities in ${destinationName} matched all your active filters simultaneously.`)}
          </p>
        </div>

        {/* Current Active Filters Summary */}
        <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E8E2D9] text-xs space-y-2 text-left max-w-lg mx-auto">
          <span className="font-semibold text-[#1E232A] uppercase tracking-wider text-[10px] text-[#6B7280]">
            Active Trip Criteria:
          </span>
          <div className="grid grid-cols-2 gap-2 text-[#4B5563]">
            <div>• Destination: <strong className="text-[#1E232A]">{destinationName}</strong></div>
            <div>• Duration: <strong className="text-[#1E232A]">{numDays} Days</strong></div>
            <div>• Budget: <strong className="text-[#1E232A]">${currentBudget} SGD</strong></div>
            <div>• Family Mode: <strong className="text-[#1E232A]">{hasChildren ? 'Yes (Children)' : 'No'}</strong></div>
          </div>
          {selectedCategories.length > 0 && (
            <div className="pt-1 border-t border-[#E8E2D9]/60">
              Categories: <span className="font-semibold text-[#1E232A]">{selectedCategories.join(', ')}</span>
            </div>
          )}
        </div>

        {/* Quick Action Suggestions */}
        <div className="space-y-3 pt-2 text-left max-w-lg mx-auto">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#C85A32] uppercase tracking-wider">
            <Lightbulb className="w-4 h-4" />
            <span>Recommended Adjustments:</span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {isBudgetDeficit && minBudgetNeededSGD && (
              <button
                onClick={() => onRaiseBudget(minBudgetNeededSGD)}
                className="flex items-center justify-between p-4 rounded-2xl border border-[#E8E2D9] bg-[#FAF8F5] hover:border-[#1E232A] hover:bg-white transition-all text-xs text-left group"
              >
                <div>
                  <div className="font-bold text-[#1E232A]">Option A: Increase Budget</div>
                  <div className="text-[#6B7280]">Adjust budget to recommended minimum of ${minBudgetNeededSGD} SGD</div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#1E232A] group-hover:translate-x-1 transition-transform" />
              </button>
            )}

            {selectedCategories.length > 0 && (
              <button
                onClick={onClearCategories}
                className="flex items-center justify-between p-4 rounded-2xl border border-[#E8E2D9] bg-[#FAF8F5] hover:border-[#1E232A] hover:bg-white transition-all text-xs text-left group"
              >
                <div>
                  <div className="font-bold text-[#1E232A]">Option B: Broaden Category Preferences</div>
                  <div className="text-[#6B7280]">Include all activity categories to discover more available options</div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#1E232A] group-hover:translate-x-1 transition-transform" />
              </button>
            )}

            <button
              onClick={onModifyForm}
              className="flex items-center justify-between p-4 rounded-2xl border border-[#1E232A] bg-[#1E232A] text-white hover:bg-[#323842] transition-all text-xs text-left group"
            >
              <div>
                <div className="font-bold text-white">Option C: Modify Trip Settings</div>
                <div className="text-white/80">Return to planning form to adjust dates, budget, or family toggle</div>
              </div>
              <RefreshCw className="w-4 h-4 text-[#E8DFD1] group-hover:rotate-180 transition-transform duration-500" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
