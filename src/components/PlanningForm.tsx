import React, { useState } from 'react';
import {
  Calendar,
  DollarSign,
  Users,
  Compass,
  MapPin,
  Trees,
  Mountain,
  Landmark,
  Palette,
  UtensilsCrossed,
  Sparkles,
  Baby,
  Check,
  Globe,
  User,
  Heart,
  ShieldCheck
} from 'lucide-react';
import { ActivityCategory, DestinationId, TravelerType, TripFormData } from '../types';
import { DESTINATIONS } from '../data/destinations';
import { calculateNumDays } from '../utils/itineraryPlanner';
import { CurrencyCode, CURRENCIES, convertFromSGD, convertToSGD, formatCurrency } from '../utils/currency';

interface PlanningFormProps {
  onSubmit: (formData: TripFormData) => void;
  initialValues?: TripFormData;
}

const CATEGORY_ITEMS: { category: ActivityCategory; icon: React.ReactNode; label: string }[] = [
  { category: 'Outdoor & Nature', icon: <Trees className="w-4 h-4" />, label: 'Outdoor & Nature' },
  { category: 'Adventure', icon: <Mountain className="w-4 h-4" />, label: 'Adventure' },
  { category: 'Historical & Monuments', icon: <Landmark className="w-4 h-4" />, label: 'Historical & Monuments' },
  { category: 'Galleries & Museums', icon: <Palette className="w-4 h-4" />, label: 'Galleries & Museums' },
  { category: 'Food & Dining', icon: <UtensilsCrossed className="w-4 h-4" />, label: 'Food & Dining' },
  { category: 'Relaxation', icon: <Sparkles className="w-4 h-4" />, label: 'Relaxation' }
];

const TRAVELER_OPTIONS: { type: TravelerType; icon: React.ReactNode; label: string; desc: string }[] = [
  { type: 'Solo (Female)', icon: <ShieldCheck className="w-4 h-4 text-[#C85A32]" />, label: 'Solo (Female)', desc: 'Safety tips, solo dining & transit notes' },
  { type: 'Solo (Male)', icon: <User className="w-4 h-4 text-[#1E232A]" />, label: 'Solo (Male)', desc: 'Practical solo traveler notes & routes' },
  { type: 'Couple', icon: <Heart className="w-4 h-4 text-[#D97706]" />, label: 'Couple', desc: 'Curated experiences ideal for two' },
  { type: 'Family', icon: <Baby className="w-4 h-4 text-[#4B6B58]" />, label: 'Family', desc: 'Child-friendly activities & age filters' }
];

export const PlanningForm: React.FC<PlanningFormProps> = ({ onSubmit, initialValues }) => {
  // Default values
  const todayStr = new Date().toISOString().split('T')[0];
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 3);
  const nextWeekStr = nextWeek.toISOString().split('T')[0];

  const [destination, setDestination] = useState<DestinationId>(
    initialValues?.destination || 'Kuala Lumpur'
  );
  const [regionFilter, setRegionFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [startDate, setStartDate] = useState<string>(
    initialValues?.startDate || todayStr
  );
  const [endDate, setEndDate] = useState<string>(
    initialValues?.endDate || nextWeekStr
  );
  const [currency, setCurrency] = useState<CurrencyCode>(
    initialValues?.currency || 'SGD'
  );
  
  // Base budget in SGD
  const [budgetSGD, setBudgetSGD] = useState<number>(
    initialValues?.budgetSGD || 400
  );
  const [preferences, setPreferences] = useState<ActivityCategory[]>(
    initialValues?.preferences || ['Food & Dining', 'Historical & Monuments', 'Outdoor & Nature']
  );
  const [travelerType, setTravelerType] = useState<TravelerType>(
    initialValues?.travelerType || 'Couple'
  );
  const [hasChildren, setHasChildren] = useState<boolean>(
    initialValues?.hasChildren || false
  );

  const handleTravelerTypeChange = (type: TravelerType) => {
    setTravelerType(type);
    if (type !== 'Family') {
      setHasChildren(false);
    } else {
      setHasChildren(true);
    }
  };

  const daysCount = calculateNumDays(startDate, endDate);
  const currentDest = DESTINATIONS[destination];

  // Amount in active currency for user input
  const displayedBudget = convertFromSGD(budgetSGD, currency);

  const toggleCategory = (cat: ActivityCategory) => {
    if (preferences.includes(cat)) {
      setPreferences(preferences.filter(c => c !== cat));
    } else {
      setPreferences([...preferences, cat]);
    }
  };

  const handleCurrencyChange = (newCurrency: CurrencyCode) => {
    setCurrency(newCurrency);
  };

  const handleUserBudgetInput = (amountInActiveCurrency: number) => {
    const convertedSGD = convertToSGD(amountInActiveCurrency, currency);
    setBudgetSGD(Math.max(10, convertedSGD));
  };

  const handlePresetBudget = (presetAmountSGD: number) => {
    setBudgetSGD(presetAmountSGD);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      destination,
      startDate,
      endDate,
      budgetSGD: Number(budgetSGD) || 100,
      currency,
      travelerType,
      preferences,
      hasChildren: travelerType === 'Family' ? hasChildren : false
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10 max-w-4xl mx-auto py-6 px-4 sm:px-6">
      
      {/* SECTION 1: DESTINATION SELECTION */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 gap-3">
          <div>
            <span className="text-xs font-sans uppercase tracking-widest text-[#C85A32] font-semibold">Step 01</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1E232A]">Select Malaysian State</h2>
            <p className="text-xs text-[#6B7280] mt-0.5">Curated guides across all 13 states & Federal Territories of Malaysia</p>
          </div>

          {/* Quick Dropdown / Search Selector */}
          <div className="w-full sm:w-64">
            <label className="block text-[11px] font-semibold text-[#4B5563] uppercase tracking-wider mb-1">Quick Select State</label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value as DestinationId)}
              className="w-full px-3 py-2 rounded-xl border border-[#E8E2D9] bg-white text-xs font-medium text-[#1E232A] focus:outline-none focus:ring-2 focus:ring-[#1E232A]"
            >
              {Object.values(DESTINATIONS).map((dest) => (
                <option key={dest.id} value={dest.id}>
                  🇲🇾 {dest.name} ({dest.tagline.split('&')[0].trim()})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search & Region Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4 bg-white p-2.5 rounded-2xl border border-[#E8E2D9]">
          {/* Region Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {['All', 'Peninsular', 'Borneo'].map((reg) => (
              <button
                key={reg}
                type="button"
                onClick={() => setRegionFilter(reg)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  regionFilter === reg
                    ? 'bg-[#1E232A] text-white shadow-xs'
                    : 'text-[#6B7280] hover:text-[#1E232A] hover:bg-[#FAF8F5]'
                }`}
              >
                {reg === 'All' ? 'All States (14)' : reg === 'Peninsular' ? 'Peninsular Malaysia' : 'East Malaysia (Borneo)'}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search state or highlight..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-56 pl-3 pr-8 py-1.5 rounded-xl border border-[#E8E2D9] bg-[#FAF8F5] text-xs font-medium text-[#1E232A] focus:outline-none focus:ring-1 focus:ring-[#1E232A]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2 text-xs text-[#9CA3AF] hover:text-[#1E232A]"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* State Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[520px] overflow-y-auto pr-1">
          {Object.values(DESTINATIONS)
            .filter((dest) => {
              // Region filter
              if (regionFilter === 'Borneo' && dest.id !== 'Sabah' && dest.id !== 'Sarawak') return false;
              if (regionFilter === 'Peninsular' && (dest.id === 'Sabah' || dest.id === 'Sarawak')) return false;
              // Search query filter
              if (searchQuery.trim()) {
                const q = searchQuery.toLowerCase();
                const matchName = dest.name.toLowerCase().includes(q);
                const matchDesc = dest.description.toLowerCase().includes(q);
                const matchTag = dest.tagline.toLowerCase().includes(q);
                const matchHighlight = dest.highlights.some(h => h.toLowerCase().includes(q));
                return matchName || matchDesc || matchTag || matchHighlight;
              }
              return true;
            })
            .map((dest) => {
              const isSelected = destination === dest.id;
              return (
                <div
                  key={dest.id}
                  onClick={() => setDestination(dest.id as DestinationId)}
                  className={`relative rounded-2xl overflow-hidden border-2 cursor-pointer transition-all duration-300 group flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#1E232A] shadow-md ring-2 ring-[#1E232A]/10 scale-[1.01]'
                      : 'border-[#E8E2D9] hover:border-[#B8B0A2] opacity-90 hover:opacity-100'
                  }`}
                >
                  {/* Background image */}
                  <div className="h-36 w-full relative overflow-hidden bg-[#1E232A]">
                    <img
                      src={dest.coverImage}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    
                    {/* Selected Indicator Badge */}
                    {isSelected && (
                      <div className="absolute top-2.5 right-2.5 bg-[#1E232A] text-white p-1 rounded-full shadow-md">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                    )}

                    <div className="absolute bottom-2.5 left-3 right-3 text-white">
                      <div className="flex items-center gap-1 text-[10px] font-sans tracking-wide uppercase text-white/80">
                        <MapPin className="w-2.5 h-2.5 text-[#E8DFD1]" />
                        <span>{dest.country}</span>
                      </div>
                      <h3 className="font-serif text-xl font-bold leading-tight">{dest.name}</h3>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-3 bg-white space-y-2 text-xs flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-[11px] font-semibold text-[#C85A32] line-clamp-1 mb-0.5">{dest.tagline}</p>
                      <p className="text-[#4B5563] line-clamp-2 leading-relaxed text-[11px]">{dest.description}</p>
                    </div>
                    <div className="pt-2 border-t border-[#F3EFEA] flex items-center justify-between text-[10px] text-[#6B7280]">
                      <span>Avg activity budget:</span>
                      <span className="font-semibold text-[#1E232A]">
                        {formatCurrency(dest.avgDailyBudgetSGD, currency)}/day
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* SECTION 2: DATES & BUDGET */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E2D9] shadow-xs">
        
        {/* Date Range Picker */}
        <div className="space-y-3">
          <div>
            <span className="text-xs font-sans uppercase tracking-widest text-[#C85A32] font-semibold">Step 02</span>
            <label className="block font-serif text-xl font-semibold text-[#1E232A] mt-0.5">
              Travel Dates
            </label>
            <p className="text-xs text-[#6B7280]">Select trip start and end date</p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-[11px] font-semibold text-[#4B5563] uppercase tracking-wider mb-1">Start Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={startDate}
                  min={todayStr}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E8E2D9] bg-[#FAF8F5] text-xs font-medium text-[#1E232A] focus:outline-none focus:ring-2 focus:ring-[#1E232A]"
                  required
                />
                <Calendar className="w-4 h-4 text-[#6B7280] absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#4B5563] uppercase tracking-wider mb-1">End Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={endDate}
                  min={startDate || todayStr}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E8E2D9] bg-[#FAF8F5] text-xs font-medium text-[#1E232A] focus:outline-none focus:ring-2 focus:ring-[#1E232A]"
                  required
                />
                <Calendar className="w-4 h-4 text-[#6B7280] absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Days summary pill */}
          <div className="flex items-center justify-between px-3.5 py-2 bg-[#F7F4EF] rounded-xl text-xs text-[#4B5563]">
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#C85A32]" />
              Calculated Duration:
            </span>
            <span className="font-semibold text-[#1E232A]">
              {daysCount} {daysCount === 1 ? 'Day' : 'Days'} ({daysCount - 1} {daysCount - 1 === 1 ? 'Night' : 'Nights'})
            </span>
          </div>
        </div>

        {/* Budget Input & Currency Selector */}
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-sans uppercase tracking-widest text-[#C85A32] font-semibold">Step 03</span>
              <label className="block font-serif text-xl font-semibold text-[#1E232A] mt-0.5">
                Activity Budget
              </label>
              <p className="text-xs text-[#6B7280]">Total budget for activities across {daysCount} days</p>
            </div>

            {/* Currency Selector Dropdown */}
            <div>
              <label className="block text-[10px] font-bold text-[#C85A32] uppercase tracking-wider mb-1">Currency</label>
              <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-[#E8E2D9] bg-[#FAF8F5] text-xs font-bold text-[#1E232A]">
                <Globe className="w-3.5 h-3.5 text-[#C85A32]" />
                <select
                  value={currency}
                  onChange={(e) => handleCurrencyChange(e.target.value as CurrencyCode)}
                  className="bg-transparent font-bold text-xs text-[#1E232A] focus:outline-none cursor-pointer"
                >
                  {Object.values(CURRENCIES).map((curr) => (
                    <option key={curr.code} value={curr.code}>
                      {curr.code} ({curr.symbol})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="pt-1">
            <label className="block text-[11px] font-semibold text-[#4B5563] uppercase tracking-wider mb-1">
              Total Amount ({CURRENCIES[currency].code} {CURRENCIES[currency].symbol})
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-3 text-sm font-bold text-[#1E232A]">
                {CURRENCIES[currency].symbol}
              </span>
              <input
                type="number"
                min="10"
                max="50000"
                step="10"
                value={displayedBudget}
                onChange={(e) => handleUserBudgetInput(Number(e.target.value))}
                className="w-full pl-9 pr-16 py-2.5 rounded-xl border border-[#E8E2D9] bg-[#FAF8F5] text-sm font-bold text-[#1E232A] focus:outline-none focus:ring-2 focus:ring-[#1E232A]"
                placeholder="400"
                required
              />
              <span className="absolute right-3 top-3 text-xs font-bold text-[#1E232A] bg-[#E8DFD1] px-2 py-0.5 rounded-md">
                {CURRENCIES[currency].code}
              </span>
            </div>
          </div>

          {/* Budget Presets in Selected Currency */}
          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <span className="text-[11px] text-[#6B7280]">Presets:</span>
            {[
              { label: 'Budget', valSGD: 200 },
              { label: 'Standard', valSGD: 450 },
              { label: 'Luxury', valSGD: 900 }
            ].map((preset) => {
              const presetScaledSGD = preset.valSGD * Math.max(1, Math.round(daysCount / 3));
              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => handlePresetBudget(presetScaledSGD)}
                  className="px-2.5 py-1 rounded-lg border border-[#E8E2D9] bg-white text-[11px] font-medium text-[#4B5563] hover:border-[#1E232A] hover:text-[#1E232A] transition-all"
                >
                  {preset.label} ({formatCurrency(presetScaledSGD, currency)})
                </button>
              );
            })}
          </div>

          <div className="text-[11px] text-[#6B7280] italic">
            Approx. {formatCurrency(Math.round(budgetSGD / Math.max(1, daysCount)), currency)} per day for activities.
          </div>
        </div>

      </div>

      {/* SECTION 4: TRAVELER TYPE & ACTIVITY PREFERENCES */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E2D9] space-y-6 shadow-xs">
        <div>
          <span className="text-xs font-sans uppercase tracking-widest text-[#C85A32] font-semibold">Step 04</span>
          <h2 className="font-serif text-2xl font-semibold text-[#1E232A]">Traveler Type & Activity Preferences</h2>
          <p className="text-xs text-[#6B7280] mt-0.5">Customize recommendations based on who is traveling and what you love doing</p>
        </div>

        {/* Traveler Type Selector */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563] mb-3">
            Who Is Traveling?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {TRAVELER_OPTIONS.map((opt) => {
              const isSelected = travelerType === opt.type;
              return (
                <button
                  key={opt.type}
                  type="button"
                  onClick={() => handleTravelerTypeChange(opt.type)}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 ${
                    isSelected
                      ? 'bg-[#1E232A] text-white border-[#1E232A] shadow-md ring-2 ring-[#1E232A]/10'
                      : 'bg-[#FAF8F5] text-[#1E232A] border-[#E8E2D9] hover:border-[#B8B0A2] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className={`p-2 rounded-xl ${isSelected ? 'bg-white/10 text-[#E8DFD1]' : 'bg-white text-[#C85A32] shadow-2xs'}`}>
                      {opt.icon}
                    </div>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-[#4B6B58] text-white flex items-center justify-center text-[10px] font-bold">
                        ✓
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="font-serif text-sm font-bold leading-tight">{opt.label}</h4>
                    <p className={`text-[11px] mt-1 leading-snug ${isSelected ? 'text-white/80' : 'text-[#6B7280]'}`}>
                      {opt.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Conditional Family Prompt: Traveling with children? */}
        {travelerType === 'Family' && (
          <div className="p-4 rounded-2xl bg-[#E8F0EA] border border-[#C3DEC9] flex items-center justify-between transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#4B6B58] text-white flex items-center justify-center flex-shrink-0">
                <Baby className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold text-[#1E232A]">Traveling with children / kids?</h4>
                <p className="text-xs text-[#2D5A3C]">
                  Automatically filters out high-intensity/adult venues and highlights family age notes
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setHasChildren(true)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  hasChildren
                    ? 'bg-[#2D5A3C] text-white shadow-xs'
                    : 'bg-white text-[#2D5A3C] border border-[#C3DEC9]'
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => setHasChildren(false)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  !hasChildren
                    ? 'bg-[#2D5A3C] text-white shadow-xs'
                    : 'bg-white text-[#2D5A3C] border border-[#C3DEC9]'
                }`}
              >
                No
              </button>
            </div>
          </div>
        )}

        {/* Preference Multi-select chips */}
        <div className="pt-2 border-t border-[#F3EFEA]">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563] mb-3">
            Select Preferred Activity Categories (Multi-select)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {CATEGORY_ITEMS.map((item) => {
              const isSelected = preferences.includes(item.category);
              return (
                <button
                  key={item.category}
                  type="button"
                  onClick={() => toggleCategory(item.category)}
                  className={`flex items-center gap-2.5 p-3 rounded-2xl border text-xs font-semibold transition-all text-left ${
                    isSelected
                      ? 'bg-[#1E232A] text-white border-[#1E232A] shadow-sm'
                      : 'bg-[#FAF8F5] text-[#4B5563] border-[#E8E2D9] hover:border-[#B8B0A2] hover:bg-white'
                  }`}
                >
                  <div className={`p-1.5 rounded-xl ${isSelected ? 'bg-white/10 text-[#E8DFD1]' : 'bg-white text-[#C85A32] shadow-xs'}`}>
                    {item.icon}
                  </div>
                  <span className="flex-1 leading-tight">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <div className="pt-2 text-center">
        <button
          type="submit"
          className="w-full sm:w-auto px-10 py-4 rounded-full bg-[#1E232A] text-white font-serif text-lg font-medium hover:bg-[#323842] active:scale-95 transition-all shadow-md flex items-center justify-center gap-3 mx-auto"
        >
          <Sparkles className="w-5 h-5 text-[#E8DFD1]" />
          <span>Generate Personalized Itinerary</span>
        </button>
        <p className="text-xs text-[#6B7280] mt-2">
          Instant calculation using curated activity dataset for {currentDest.name}
        </p>
      </div>

    </form>
  );
};

