import React from 'react';
import { Compass, Bookmark, Sparkles, DollarSign } from 'lucide-react';
import { CurrencyCode, CURRENCIES } from '../utils/currency';

interface HeaderProps {
  onReset: () => void;
  savedTripsCount: number;
  onOpenSavedTrips: () => void;
  currentCurrency?: CurrencyCode;
  onCurrencyChange?: (currency: CurrencyCode) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onReset,
  savedTripsCount,
  onOpenSavedTrips,
  currentCurrency = 'SGD',
  onCurrencyChange
}) => {
  return (
    <header className="border-b border-[#E8E2D9] bg-[#FAF8F5]/90 backdrop-blur-md sticky top-0 z-30 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand logo & title */}
        <div 
          onClick={onReset}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-full bg-[#1E232A] text-[#FAF8F5] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5 stroke-[1.75]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-semibold tracking-tight text-[#1E232A]">
                Voyageur
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-sans uppercase tracking-widest bg-[#E8DFD1] text-[#1E232A] font-semibold rounded-full">
                Curated
              </span>
            </div>
            <p className="text-xs text-[#6B7280] font-sans tracking-wide">
              Bespoke Day-by-Day Travel Planner
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Global Currency Selector Dropdown */}
          {onCurrencyChange && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E8E2D9] bg-white text-xs font-semibold text-[#1E232A] shadow-xs">
              <DollarSign className="w-3.5 h-3.5 text-[#C85A32]" />
              <select
                value={currentCurrency}
                onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
                className="bg-transparent font-semibold text-xs text-[#1E232A] focus:outline-none cursor-pointer pr-1"
                aria-label="Select currency"
              >
                {Object.values(CURRENCIES).map((curr) => (
                  <option key={curr.code} value={curr.code}>
                    {curr.code} ({curr.symbol})
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            onClick={onOpenSavedTrips}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-[#E8E2D9] bg-white text-xs font-semibold text-[#1E232A] hover:bg-[#F3EFEA] hover:border-[#D9D2C7] transition-all shadow-xs"
          >
            <Bookmark className="w-3.5 h-3.5 text-[#C85A32]" />
            <span className="hidden sm:inline">Saved Trips</span>
            {savedTripsCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#C85A32] text-white text-[10px] flex items-center justify-center font-bold">
                {savedTripsCount}
              </span>
            )}
          </button>

          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1E232A] text-white text-xs font-semibold hover:bg-[#323842] transition-all shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E8DFD1]" />
            <span className="hidden sm:inline">New Plan</span>
          </button>
        </div>

      </div>
    </header>
  );
};

