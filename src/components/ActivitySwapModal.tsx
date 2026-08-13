import React from 'react';
import { X, Check, Clock, MapPin, AlertCircle, Baby } from 'lucide-react';
import { Activity, TimeSlot } from '../types';

interface ActivitySwapModalProps {
  isOpen: boolean;
  onClose: () => void;
  dayNumber: number;
  timeSlot: TimeSlot;
  currentActivity?: Activity;
  availableOptions: Activity[];
  onSelectOption: (newActivity: Activity) => void;
}

export const ActivitySwapModal: React.FC<ActivitySwapModalProps> = ({
  isOpen,
  onClose,
  dayNumber,
  timeSlot,
  currentActivity,
  availableOptions,
  onSelectOption
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-[#E8E2D9] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-[#E8E2D9] flex items-center justify-between bg-[#FAF8F5]">
          <div>
            <span className="text-xs font-sans uppercase tracking-widest text-[#C85A32] font-semibold">
              Customize Day {dayNumber} • {timeSlot}
            </span>
            <h3 className="font-serif text-2xl font-semibold text-[#1E232A]">Select Alternative Activity</h3>
            <p className="text-xs text-[#6B7280]">Replace current activity with another curated option for {timeSlot}</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white border border-[#E8E2D9] flex items-center justify-center text-[#1E232A] hover:bg-[#F3EFEA] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Options List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {availableOptions.length === 0 ? (
            <div className="text-center py-10 space-y-2">
              <AlertCircle className="w-10 h-10 text-[#C85A32] mx-auto opacity-70" />
              <p className="font-serif text-lg text-[#1E232A]">No additional options available</p>
              <p className="text-xs text-[#6B7280] max-w-sm mx-auto">
                All curated activities for this time slot are already placed in your itinerary or filtered out by family constraints.
              </p>
            </div>
          ) : (
            availableOptions.map((option) => {
              const isCurrent = currentActivity?.id === option.id;
              
              // Family status styling
              let familyBadgeClass = 'bg-[#E8F0EA] text-[#2D5A3C] border-[#C3DEC9]';
              if (option.familyStatus === 'Not recommended for children') {
                familyBadgeClass = 'bg-[#FDF2F2] text-[#9B1C1C] border-[#F8B4B4]';
              } else if (option.familyStatus === 'Conditional') {
                familyBadgeClass = 'bg-[#EFF6FF] text-[#1E40AF] border-[#BFDBFE]';
              }

              return (
                <div
                  key={option.id}
                  onClick={() => {
                    onSelectOption(option);
                    onClose();
                  }}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between group ${
                    isCurrent
                      ? 'border-[#1E232A] bg-[#FAF8F5]'
                      : 'border-[#E8E2D9] hover:border-[#1E232A] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={option.imageUrl}
                      alt={option.name}
                      className="w-20 h-20 rounded-xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#F3EFEA] text-[#1E232A]">
                          {option.category}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${familyBadgeClass}`}>
                          {option.familyStatus}
                        </span>
                      </div>
                      <h4 className="font-serif text-base font-semibold text-[#1E232A] leading-tight">
                        {option.name}
                      </h4>
                      <p className="text-xs text-[#4B5563] line-clamp-1">{option.description}</p>
                      {option.familyNote && (
                        <div className="flex items-center gap-1 text-[11px] text-[#1E40AF]">
                          <Baby className="w-3 h-3" />
                          <span>Note: {option.familyNote}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-[#F3EFEA]">
                    <span className="text-base font-bold text-[#1E232A]">
                      {option.costSGD === 0 ? 'Free' : `$${option.costSGD} SGD`}
                    </span>
                    <button className="px-3 py-1.5 rounded-full bg-[#1E232A] text-white text-xs font-medium hover:bg-[#323842] transition-all">
                      Select
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
