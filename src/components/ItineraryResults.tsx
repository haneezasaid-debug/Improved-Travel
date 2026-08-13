import React, { useState } from 'react';
import {
  Calendar,
  DollarSign,
  MapPin,
  Clock,
  Baby,
  Share2,
  Download,
  BookmarkCheck,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Sun,
  Sunrise,
  Sunset,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Check,
  Plus,
  Globe,
  Wallet,
  ShieldCheck,
  User,
  Users,
  Heart
} from 'lucide-react';
import { Activity, DayItinerary, ItineraryPlan, TimeSlot } from '../types';
import { ACTIVITIES } from '../data/activities';
import { CurrencyCode, CURRENCIES, formatCurrency } from '../utils/currency';
import { DisqusComments } from './DisqusComments';

interface ItineraryResultsProps {
  plan: ItineraryPlan;
  onModifyForm: () => void;
  onSaveTrip: (plan: ItineraryPlan) => void;
  isTripSaved: boolean;
  onUpdatePlan: (updatedPlan: ItineraryPlan) => void;
}

export const ItineraryResults: React.FC<ItineraryResultsProps> = ({
  plan,
  onModifyForm,
  onSaveTrip,
  isTripSaved,
  onUpdatePlan
}) => {
  const currency: CurrencyCode = plan.currency || 'SGD';

  // State for collapsed days (default false = open)
  const [collapsedDays, setCollapsedDays] = useState<Record<number, boolean>>({});

  const toggleDayCollapsed = (dayNum: number) => {
    setCollapsedDays(prev => ({
      ...prev,
      [dayNum]: !prev[dayNum]
    }));
  };

  // Currency change handler
  const handleCurrencyChange = (newCurrency: CurrencyCode) => {
    onUpdatePlan({
      ...plan,
      currency: newCurrency
    });
  };

  // Toggle or move selection of an activity for a given target day
  const handleToggleActivity = (targetDayNumber: number, activityId: string) => {
    console.log(`[handleToggleActivity] TRIGGERED -> Day: ${targetDayNumber}, Activity ID: ${activityId}`);

    const destActivities = ACTIVITIES.filter(a => a.destination === plan.destination);

    const updatedDays = plan.days.map((d) => {
      const isTargetDay = d.dayNumber === targetDayNumber;
      const currentSelected = d.selectedActivityIds || [];
      const isCurrentlySelectedOnThisDay = currentSelected.includes(activityId);

      let nextSelected: string[];

      if (isTargetDay) {
        if (isCurrentlySelectedOnThisDay) {
          // Deselect from target day
          nextSelected = currentSelected.filter(id => id !== activityId);
        } else {
          // Select on target day
          nextSelected = [...currentSelected, activityId];
        }
      } else {
        // If this activity was selected on another day, remove it from that day (moving it to target day)
        if (isCurrentlySelectedOnThisDay) {
          nextSelected = currentSelected.filter(id => id !== activityId);
        } else {
          nextSelected = currentSelected;
        }
      }

      // Calculate new day cost reliably from destination activities
      const selectedObjects = destActivities.filter(a => nextSelected.includes(a.id));
      const dayCostSGD = selectedObjects.reduce((sum, a) => sum + a.costSGD, 0);

      // Slot pointers for backward compatibility
      const morning = selectedObjects.find(a => a.timeSlot === 'Morning');
      const afternoon = selectedObjects.find(a => a.timeSlot === 'Afternoon');
      const evening = selectedObjects.find(a => a.timeSlot === 'Evening');

      return {
        ...d,
        selectedActivityIds: nextSelected,
        dayCostSGD,
        dayCost: dayCostSGD,
        morning,
        afternoon,
        evening
      };
    });

    const newTotalCostSGD = updatedDays.reduce((sum, d) => sum + (d.dayCostSGD || 0), 0);
    const newRemainingBudgetSGD = Math.max(0, plan.budgetSGD - newTotalCostSGD);

    const targetDayObj = updatedDays.find(d => d.dayNumber === targetDayNumber);
    console.log(
      `[handleToggleActivity] SUCCESS -> Day ${targetDayNumber} now has ${targetDayObj?.selectedActivityIds?.length || 0} selected activities. New total cost: $${newTotalCostSGD} SGD`
    );

    onUpdatePlan({
      ...plan,
      days: updatedDays,
      totalCostSGD: newTotalCostSGD,
      remainingBudgetSGD: newRemainingBudgetSGD
    });
  };

  // Calculate day-by-day budget carry forward breakdown
  const getDayBudgetBreakdown = (dayNum: number) => {
    const priorSpentSGD = plan.days
      .filter(d => d.dayNumber < dayNum)
      .reduce((sum, d) => sum + d.dayCostSGD, 0);

    const budgetAtStartSGD = plan.budgetSGD - priorSpentSGD;

    const currentDay = plan.days.find(d => d.dayNumber === dayNum);
    const daySpentSGD = currentDay ? currentDay.dayCostSGD : 0;

    const cumulativeSpentUpToDaySGD = priorSpentSGD + daySpentSGD;
    const remainingAtEndOfDaySGD = plan.budgetSGD - cumulativeSpentUpToDaySGD;

    return {
      priorSpentSGD,
      budgetAtStartSGD,
      daySpentSGD,
      cumulativeSpentUpToDaySGD,
      remainingAtEndOfDaySGD
    };
  };

  // Copy text summary to clipboard
  const [copied, setCopied] = useState(false);
  const handleCopySummary = () => {
    let summaryText = `VOYAGEUR TRAVEL ITINERARY - ${plan.destination.toUpperCase()}\n`;
    summaryText += `Duration: ${plan.numDays} Days | Budget Allocated: ${formatCurrency(plan.totalCostSGD, currency)} of ${formatCurrency(plan.budgetSGD, currency)}\n\n`;

    plan.days.forEach(d => {
      summaryText += `--- DAY ${d.dayNumber} (${d.formattedDate}) ---\n`;
      const selectedActivities = d.availableActivities.filter(a => d.selectedActivityIds?.includes(a.id));
      if (selectedActivities.length === 0) {
        summaryText += `(Rest / Unscheduled day)\n`;
      } else {
        selectedActivities.forEach(a => {
          summaryText += `• [${a.timeSlot}] ${a.name} (${formatCurrency(a.costSGD, currency, { showFree: true })})\n`;
        });
      }
      summaryText += `Day Total: ${formatCurrency(d.dayCostSGD, currency)}\n\n`;
    });

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Print view
  const handlePrint = () => {
    window.print();
  };

  // Budget progress calculations
  const budgetRatio = plan.budgetSGD > 0 ? plan.totalCostSGD / plan.budgetSGD : 0;
  const budgetPercentage = Math.min(100, Math.round(budgetRatio * 100));

  let budgetStatusColor = 'bg-[#4B6B58] text-[#FAF8F5]'; // Sage
  let budgetBarColor = 'bg-[#4B6B58]';
  let budgetStatusLabel = 'Within Budget';

  if (plan.totalCostSGD > plan.budgetSGD) {
    budgetStatusColor = 'bg-[#C85A32] text-white';
    budgetBarColor = 'bg-[#C85A32]';
    budgetStatusLabel = 'Over Budget';
  } else if (budgetRatio > 0.85) {
    budgetStatusColor = 'bg-[#D97706] text-white';
    budgetBarColor = 'bg-[#D97706]';
    budgetStatusLabel = 'Budget Maxed';
  }

  // Count total selected activities
  const totalSelectedCount = plan.days.reduce(
    (acc, d) => acc + (d.selectedActivityIds ? d.selectedActivityIds.length : 0),
    0
  );

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 space-y-8">
      
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E8E2D9] pb-4">
        <button
          onClick={onModifyForm}
          className="flex items-center gap-2 text-xs font-semibold text-[#1E232A] hover:text-[#C85A32] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Edit Trip Parameters</span>
        </button>

        <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
          
          {/* Currency Dropdown Selector */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E8E2D9] bg-white text-xs font-semibold text-[#1E232A] shadow-2xs">
            <Globe className="w-3.5 h-3.5 text-[#C85A32]" />
            <span className="text-[10px] uppercase tracking-wider text-[#6B7280]">Currency:</span>
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

          <button
            onClick={handleCopySummary}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#E8E2D9] bg-white text-xs font-medium text-[#1E232A] hover:bg-[#FAF8F5] transition-all shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5 text-[#C85A32]" />
            <span>{copied ? 'Copied to Clipboard!' : 'Share Summary'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#E8E2D9] bg-white text-xs font-medium text-[#1E232A] hover:bg-[#FAF8F5] transition-all shadow-2xs print:hidden"
          >
            <Download className="w-3.5 h-3.5 text-[#4B6B58]" />
            <span>Print / PDF</span>
          </button>

          <button
            onClick={() => onSaveTrip(plan)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all shadow-xs ${
              isTripSaved
                ? 'bg-[#4B6B58] text-white'
                : 'bg-[#1E232A] text-white hover:bg-[#323842]'
            }`}
          >
            <BookmarkCheck className="w-3.5 h-3.5" />
            <span>{isTripSaved ? 'Saved in Library' : 'Save Itinerary'}</span>
          </button>
        </div>
      </div>

      {/* HERO DESTINATION BANNER */}
      <div className="relative rounded-3xl overflow-hidden border border-[#E8E2D9] shadow-lg bg-[#1E232A] text-white">
        <div className="h-64 sm:h-80 w-full relative">
          <img
            src={plan.destinationInfo.coverImage}
            alt={plan.destination}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E232A] via-[#1E232A]/40 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full text-[11px] font-sans uppercase tracking-widest bg-white/20 backdrop-blur-md text-white font-semibold">
              🇲🇾 {plan.destinationInfo.country}
            </span>
            <span className="px-3 py-1 rounded-full text-[11px] font-sans tracking-wide bg-[#C85A32] text-white font-semibold flex items-center gap-1 shadow-xs">
              {plan.travelerType === 'Solo (Female)' ? (
                <ShieldCheck className="w-3 h-3" />
              ) : plan.travelerType === 'Solo (Male)' ? (
                <User className="w-3 h-3" />
              ) : plan.travelerType === 'Couple' ? (
                <Heart className="w-3 h-3" />
              ) : (
                <Users className="w-3 h-3" />
              )}
              <span>Traveler: {plan.travelerType || 'Couple'}</span>
            </span>
            {plan.hasChildren && (
              <span className="px-3 py-1 rounded-full text-[11px] font-sans tracking-wide bg-[#4B6B58] text-white font-semibold flex items-center gap-1">
                <Baby className="w-3 h-3" />
                <span>Family Friendly Filter Active</span>
              </span>
            )}
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
            {plan.numDays}-Day {plan.destination} Itinerary
          </h1>
          <p className="text-sm sm:text-base text-white/90 max-w-2xl font-sans italic">
            "{plan.destinationInfo.tagline}"
          </p>

          <div className="pt-2 flex items-center gap-6 text-xs text-white/80 font-sans border-t border-white/10 flex-wrap">
            <div>Dates: <strong className="text-white">{plan.startDate} to {plan.endDate}</strong></div>
            <div>Activities Selected: <strong className="text-white">{totalSelectedCount} items</strong></div>
            <div>Active Currency: <strong className="text-white">{currency} ({CURRENCIES[currency].symbol})</strong></div>
          </div>
        </div>
      </div>

      {/* RUNNING TOTAL BUDGET TRACKER */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E2D9] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-sans uppercase tracking-widest text-[#C85A32] font-semibold flex items-center gap-1.5">
              <Wallet className="w-3.5 h-3.5" />
              Financial Running Total
            </span>
            <h3 className="font-serif text-2xl font-semibold text-[#1E232A]">
              Trip Budget Tracker
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${budgetStatusColor}`}>
              {budgetStatusLabel}
            </span>
            <div className="text-right">
              <span className="font-serif text-2xl font-bold text-[#1E232A]">
                {formatCurrency(plan.totalCostSGD, currency)}
              </span>
              <span className="text-xs text-[#6B7280] font-sans block">
                of {formatCurrency(plan.budgetSGD, currency)} Budget
              </span>
            </div>
          </div>
        </div>

        {/* Budget Progress Bar */}
        <div className="space-y-1.5">
          <div className="w-full h-3 bg-[#F3EFEA] rounded-full overflow-hidden p-0.5 border border-[#E8E2D9]">
            <div
              className={`h-full rounded-full transition-all duration-500 ${budgetBarColor}`}
              style={{ width: `${budgetPercentage}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-[#6B7280]">
            <span>{formatCurrency(0, currency)}</span>
            <span>{budgetPercentage}% allocated ({formatCurrency(plan.remainingBudgetSGD, currency)} remaining)</span>
            <span>{formatCurrency(plan.budgetSGD, currency)} Limit</span>
          </div>
        </div>

        {/* Warnings Banner if any */}
        {plan.warnings.length > 0 && (
          <div className="p-4 rounded-2xl bg-[#FFFBEB] border border-[#FCD34D] text-xs text-[#92400E] space-y-1">
            {plan.warnings.map((w, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-[#D97706] flex-shrink-0 mt-0.5" />
                <span>{w}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DAY-BY-DAY ITINERARY WITH SELECTABLE ACTIVITIES & CARRY-FORWARD BUDGET */}
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-sans uppercase tracking-widest text-[#C85A32] font-semibold">
              Interactive Planning
            </span>
            <h2 className="font-serif text-3xl font-semibold text-[#1E232A]">
              Selectable Daily Activities & Carry-Forward Budget
            </h2>
          </div>
          <p className="text-xs text-[#6B7280]">
            Check or uncheck activities per day to customize your itinerary in real time
          </p>
        </div>

        {plan.days.map((day) => {
          const isCollapsed = Boolean(collapsedDays[day.dayNumber]);
          const budgetBreakdown = getDayBudgetBreakdown(day.dayNumber);

          return (
            <div
              key={day.dayNumber}
              className="bg-white rounded-3xl border border-[#E8E2D9] shadow-xs overflow-hidden transition-all"
            >
              {/* Day Header Banner */}
              <div
                onClick={() => toggleDayCollapsed(day.dayNumber)}
                className="p-5 sm:p-6 bg-[#FAF8F5] border-b border-[#E8E2D9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-[#F3EFEA] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#1E232A] text-white flex flex-col items-center justify-center font-serif shadow-xs flex-shrink-0">
                    <span className="text-[10px] uppercase tracking-wider opacity-70">DAY</span>
                    <span className="text-lg font-bold leading-none">{day.dayNumber}</span>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#1E232A]">
                      {day.formattedDate}
                    </h3>
                    <p className="text-xs text-[#6B7280]">
                      {day.selectedActivityIds?.length || 0} activities selected for this day
                    </p>
                  </div>
                </div>

                {/* Day Financial Pill (Day Spend & Carry Forward) */}
                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-0 pt-3 sm:pt-0 border-[#E8E2D9]">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] uppercase font-semibold text-[#C85A32] block">
                      Day {day.dayNumber} Spend
                    </span>
                    <span className="font-serif text-lg font-bold text-[#1E232A]">
                      {formatCurrency(day.dayCostSGD, currency)}
                    </span>
                  </div>

                  <div className="text-left sm:text-right border-l border-[#E8E2D9] pl-4">
                    <span className="text-[10px] uppercase font-semibold text-[#4B6B58] block">
                      Carried Forward
                    </span>
                    <span className="text-xs font-semibold text-[#1E232A]">
                      {formatCurrency(budgetBreakdown.remainingAtEndOfDaySGD, currency)} remaining
                    </span>
                  </div>

                  <button className="w-8 h-8 rounded-full border border-[#E8E2D9] bg-white flex items-center justify-center text-[#1E232A] flex-shrink-0">
                    {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Day Content: Selectable Activity Cards */}
              {!isCollapsed && (
                <div className="p-6 sm:p-8 space-y-8">
                  
                  {/* Carry Forward Budget Info Banner */}
                  <div className="p-3.5 rounded-2xl bg-[#F7F4EF] border border-[#E8E2D9] text-xs text-[#4B5563] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Wallet className="w-4 h-4 text-[#C85A32]" />
                      <span>
                        Starting budget for Day {day.dayNumber}: <strong>{formatCurrency(budgetBreakdown.budgetAtStartSGD, currency)}</strong>
                      </span>
                    </div>
                    <div className="text-[11px] font-semibold text-[#1E232A]">
                      After Day {day.dayNumber} selections: {formatCurrency(budgetBreakdown.remainingAtEndOfDaySGD, currency)} carried forward
                    </div>
                  </div>

                  {/* SLOTS OR CATEGORIZED ACTIVITIES */}
                  {(['Morning', 'Afternoon', 'Evening'] as TimeSlot[]).map((slot) => {
                    const availableList = (day.availableActivities && day.availableActivities.length > 0)
                      ? day.availableActivities
                      : ACTIVITIES.filter(a => a.destination === plan.destination && (!plan.hasChildren || a.familyStatus !== 'Not recommended for children'));
                    const slotActivities = availableList.filter(a => a.timeSlot === slot);
                    if (slotActivities.length === 0) return null;

                    const slotIcons = {
                      Morning: <Sunrise className="w-4 h-4 text-[#D97706]" />,
                      Afternoon: <Sun className="w-4 h-4 text-[#C85A32]" />,
                      Evening: <Sunset className="w-4 h-4 text-[#1E40AF]" />
                    };

                    return (
                      <div key={slot} className="space-y-3">
                        <div className="flex items-center gap-2 text-xs font-bold text-[#1E232A] uppercase tracking-wider border-b border-[#F3EFEA] pb-1.5">
                          {slotIcons[slot]}
                          <span>{slot} Available Options</span>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          {slotActivities.map((act) => {
                            const isSelected = day.selectedActivityIds?.includes(act.id);
                            
                            // Check if scheduled on another day
                            const scheduledOnDay = plan.days.find(
                              d => d.dayNumber !== day.dayNumber && d.selectedActivityIds?.includes(act.id)
                            )?.dayNumber;
                            const isScheduledElsewhere = Boolean(scheduledOnDay);

                            // Calculate affordability if selected
                            const potentialTotalCostSGD = plan.totalCostSGD + (isSelected ? 0 : act.costSGD);
                            const wouldExceedBudget = !isSelected && potentialTotalCostSGD > plan.budgetSGD;
                            const excessAmountSGD = potentialTotalCostSGD - plan.budgetSGD;

                            return (
                              <div
                                key={act.id}
                                onClick={() => handleToggleActivity(day.dayNumber, act.id)}
                                className={`rounded-2xl border-2 p-4 sm:p-5 flex flex-col md:flex-row gap-5 items-start md:items-center justify-between cursor-pointer transition-all ${
                                  isSelected
                                    ? 'bg-[#FAF8F5] border-[#1E232A] shadow-md ring-1 ring-[#1E232A]/10'
                                    : isScheduledElsewhere
                                    ? 'bg-[#FAF9F6] border-[#D1D5DB] hover:border-[#1E232A]'
                                    : wouldExceedBudget
                                    ? 'bg-white border-[#FCD34D] hover:border-[#D97706]'
                                    : 'bg-white border-[#E8E2D9] hover:border-[#B8B0A2]'
                                }`}
                              >
                                {/* Left Side: Checkbox & Activity Content */}
                                <div className="flex items-start gap-4 w-full md:w-auto">
                                  
                                  {/* Checkbox / Toggle Control */}
                                  <div className="pt-1 flex-shrink-0">
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleToggleActivity(day.dayNumber, act.id);
                                      }}
                                      className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                                        isSelected
                                          ? 'bg-[#1E232A] border-[#1E232A] text-white shadow-xs'
                                          : 'bg-white border-[#D1D5DB] hover:border-[#1E232A]'
                                      }`}
                                    >
                                      {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                                    </button>
                                  </div>

                                  {/* Image */}
                                  <img
                                    src={act.imageUrl}
                                    alt={act.name}
                                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover flex-shrink-0"
                                  />

                                  {/* Text Details */}
                                  <div className="space-y-1.5 flex-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#F3EFEA] text-[#1E232A]">
                                        {act.category}
                                      </span>

                                      {/* Family Friendly Badge */}
                                      <FamilyStatusBadge
                                        status={act.familyStatus}
                                        note={act.familyNote}
                                      />

                                      {/* Scheduled elsewhere badge */}
                                      {isScheduledElsewhere && (
                                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[#FFFBEB] text-[#B45309] border border-[#FCD34D]">
                                          Selected on Day {scheduledOnDay} • Click to move to Day {day.dayNumber}
                                        </span>
                                      )}

                                      {/* Carry-forward budget warning badge */}
                                      {wouldExceedBudget && (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FEF3C7] text-[#92400E] border border-[#FCD34D]">
                                          <AlertTriangle className="w-3 h-3 text-[#D97706]" />
                                          <span>Exceeds remaining budget by {formatCurrency(excessAmountSGD, currency)}</span>
                                        </span>
                                      )}
                                    </div>

                                    <h4 className="font-serif text-base sm:text-lg font-bold text-[#1E232A] leading-snug">
                                      {act.name}
                                    </h4>

                                    <p className="text-xs text-[#4B5563] leading-relaxed line-clamp-2">
                                      {act.description}
                                    </p>

                                    <div className="flex items-center gap-4 text-[11px] text-[#6B7280] pt-1">
                                      <span className="flex items-center gap-1">
                                        <MapPin className="w-3 h-3 text-[#C85A32]" />
                                        {act.location}
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3 text-[#4B6B58]" />
                                        ~{act.estimatedHours} Hours
                                      </span>
                                    </div>

                                    {/* Solo Female Note */}
                                    {plan.travelerType === 'Solo (Female)' && act.soloNoteFemale && (
                                      <div className="mt-2 p-2.5 rounded-xl bg-[#FFF8F6] border border-[#FCD8D0] text-xs text-[#9E3018] flex items-start gap-2">
                                        <ShieldCheck className="w-3.5 h-3.5 text-[#C85A32] flex-shrink-0 mt-0.5" />
                                        <div>
                                          <span className="font-semibold text-[#802410]">Solo Female Traveler Note: </span>
                                          <span className="text-[#9E3018]">{act.soloNoteFemale}</span>
                                        </div>
                                      </div>
                                    )}

                                    {/* Solo Male Note */}
                                    {plan.travelerType === 'Solo (Male)' && act.soloNoteMale && (
                                      <div className="mt-2 p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#334155] flex items-start gap-2">
                                        <User className="w-3.5 h-3.5 text-[#1E232A] flex-shrink-0 mt-0.5" />
                                        <div>
                                          <span className="font-semibold text-[#0F172A]">Solo Traveler Note: </span>
                                          <span className="text-[#334155]">{act.soloNoteMale}</span>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Right Side Cost & Select Button */}
                                <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto pt-3 md:pt-0 border-t md:border-0 border-[#F3EFEA] gap-3">
                                  <div className="text-left md:text-right">
                                    <span className="text-[10px] uppercase font-semibold text-[#6B7280] block">Estimated Cost</span>
                                    <span className="font-serif text-xl font-bold text-[#1E232A]">
                                      {formatCurrency(act.costSGD, currency, { showFree: true })}
                                    </span>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleToggleActivity(day.dayNumber, act.id);
                                    }}
                                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                                      isSelected
                                        ? 'bg-[#1E232A] text-white shadow-xs'
                                        : isScheduledElsewhere
                                        ? 'bg-[#FEF3C7] text-[#92400E] hover:bg-[#F59E0B] hover:text-white border border-[#FCD34D]'
                                        : 'bg-[#F3EFEA] text-[#1E232A] hover:bg-[#1E232A] hover:text-white'
                                    }`}
                                  >
                                    {isSelected ? (
                                      <>
                                        <Check className="w-3.5 h-3.5" />
                                        <span>Selected</span>
                                      </>
                                    ) : isScheduledElsewhere ? (
                                      <>
                                        <Plus className="w-3.5 h-3.5" />
                                        <span>Move to Day {day.dayNumber}</span>
                                      </>
                                    ) : (
                                      <>
                                        <Plus className="w-3.5 h-3.5" />
                                        <span>Select for Day {day.dayNumber}</span>
                                      </>
                                    )}
                                  </button>
                                </div>

                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}

                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* DISQUS EMBEDDED COMMUNITY FORUM */}
      <DisqusComments
        title={`${plan.destination} Travel Itinerary`}
        pageIdentifier={`itinerary-${plan.destination.toLowerCase()}`}
      />

    </div>
  );
};

/* Family Friendly Badge component handling the 3 states */
interface FamilyStatusBadgeProps {
  status: 'Family-friendly' | 'Not recommended for children' | 'Conditional';
  note?: string;
}

const FamilyStatusBadge: React.FC<FamilyStatusBadgeProps> = ({ status, note }) => {
  if (status === 'Family-friendly') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#E8F0EA] text-[#2D5A3C] border border-[#C3DEC9]">
        <CheckCircle2 className="w-3 h-3" />
        Family-friendly
      </span>
    );
  }

  if (status === 'Not recommended for children') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#FDF2F2] text-[#9B1C1C] border border-[#F8B4B4]">
        <AlertTriangle className="w-3 h-3" />
        Not recommended for children
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#EFF6FF] text-[#1E40AF] border border-[#BFDBFE]">
      <Baby className="w-3 h-3" />
      <span>Conditional {note ? `(${note})` : ''}</span>
    </span>
  );
};
