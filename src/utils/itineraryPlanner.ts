import {
  Activity,
  ActivityCategory,
  DayItinerary,
  DestinationId,
  ItineraryPlan,
  TripFormData
} from '../types';
import { ACTIVITIES } from '../data/activities';
import { DESTINATIONS } from '../data/destinations';
import { formatCurrency } from './currency';

/**
 * Calculate total days between two date strings YYYY-MM-DD (inclusive)
 */
export function calculateNumDays(startDateStr: string, endDateStr: string): number {
  if (!startDateStr || !endDateStr) return 1;
  const [sY, sM, sD] = startDateStr.split('-').map(Number);
  const [eY, eM, eD] = endDateStr.split('-').map(Number);
  if (!sY || !sM || !sD || !eY || !eM || !eD) return 1;

  const start = new Date(sY, sM - 1, sD);
  const end = new Date(eY, eM - 1, eD);

  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return diffDays > 0 ? diffDays : 1;
}

/**
 * Format Date YYYY-MM-DD into readable string like "Mon, Oct 12"
 */
export function formatDateLabel(startDateStr: string, dayOffset: number): string {
  const [sY, sM, sD] = startDateStr.split('-').map(Number);
  if (!sY || !sM || !sD) return `Day ${dayOffset + 1}`;

  const targetDate = new Date(sY, sM - 1, sD + dayOffset);

  return targetDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Generate a complete, personalized itinerary based on form inputs
 */
export function generateItinerary(formData: TripFormData): ItineraryPlan {
  const currency = formData.currency || 'SGD';
  const destInfo = DESTINATIONS[formData.destination] || DESTINATIONS['Kuala Lumpur'];
  const numDays = calculateNumDays(formData.startDate, formData.endDate);
  
  // 1. Check budget baseline requirement
  const minNeededForTrip = destInfo.minDailyBudgetSGD * numDays;
  const isBudgetDeficit = formData.budgetSGD < minNeededForTrip;

  // 2. Filter activities by destination
  const destActivities = ACTIVITIES.filter(a => a.destination === formData.destination);

  // 3. Filter by children constraint
  let eligibleActivities = destActivities;
  if (formData.hasChildren) {
    eligibleActivities = destActivities.filter(
      a => a.familyStatus !== 'Not recommended for children'
    );
  }

  // 4. Filter by preferences if any selected
  let preferenceFiltered = eligibleActivities;
  if (formData.preferences && formData.preferences.length > 0) {
    preferenceFiltered = eligibleActivities.filter(a =>
      formData.preferences.includes(a.category)
    );
  }

  // Detect Empty / Edge States
  const warnings: string[] = [];
  const suggestions: ItineraryPlan['suggestions'] = [];
  let emptyStateReason: string | undefined = undefined;

  if (isBudgetDeficit) {
    warnings.push(
      `Your budget of ${formatCurrency(formData.budgetSGD, currency)} is lower than the recommended ${formatCurrency(minNeededForTrip, currency)} for a ${numDays}-day trip to ${formData.destination}.`
    );
    suggestions.push({
      label: `Increase budget to ${formatCurrency(minNeededForTrip, currency)}`,
      actionType: 'RAISE_BUDGET',
      suggestedValue: minNeededForTrip
    });
    if (numDays > 2) {
      const suggestedDays = Math.max(1, Math.floor(formData.budgetSGD / destInfo.minDailyBudgetSGD));
      suggestions.push({
        label: `Shorten trip length to ${suggestedDays} ${suggestedDays === 1 ? 'day' : 'days'}`,
        actionType: 'SHORTEN_TRIP',
        suggestedValue: suggestedDays
      });
    }
  }

  // If preference filter yielded zero matches
  if (preferenceFiltered.length === 0) {
    if (formData.hasChildren && destActivities.some(a => formData.preferences.includes(a.category))) {
      emptyStateReason = `No ${formData.preferences.join(', ')} activities in ${formData.destination} matched your family-friendly filter for this trip.`;
      suggestions.push({
        label: 'Include all category preferences',
        actionType: 'REMOVE_FILTER'
      });
    } else {
      emptyStateReason = `No activities found in ${formData.destination} matching the selected categories (${formData.preferences.join(', ')}).`;
      suggestions.push({
        label: 'Select additional category preferences',
        actionType: 'REMOVE_FILTER'
      });
    }
  }

  // Use preference-filtered pool if available; otherwise fall back to eligible pool
  const candidatePool = preferenceFiltered.length > 0 ? preferenceFiltered : eligibleActivities;

  // 5. Build Day-by-Day Plan with initial recommended pre-selections
  const usedActivityIds = new Set<string>();
  let currentRunningTotal = 0;
  let unfilledSlotsCount = 0;

  const days: DayItinerary[] = [];

  for (let d = 0; d < numDays; d++) {
    const dateStr = formatDateLabel(formData.startDate, d);
    const daySelectedIds: string[] = [];

    const availableForThisDay = eligibleActivities.length > 0 ? [...eligibleActivities] : [...destActivities];

    const dayItinerary: DayItinerary = {
      dayNumber: d + 1,
      dateStr: formData.startDate,
      formattedDate: dateStr,
      selectedActivityIds: [],
      availableActivities: availableForThisDay,
      dayCostSGD: 0,
      dayCost: 0
    };

    const slots: ('Morning' | 'Afternoon' | 'Evening')[] = ['Morning', 'Afternoon', 'Evening'];

    for (const slot of slots) {
      // Find candidate activities for this time slot
      let candidates = candidatePool.filter(
        a =>
          a.timeSlot === slot &&
          !usedActivityIds.has(a.id) &&
          currentRunningTotal + a.costSGD <= formData.budgetSGD
      );

      if (candidates.length === 0) {
        candidates = destActivities.filter(
          a =>
            a.timeSlot === slot &&
            !usedActivityIds.has(a.id) &&
            (!formData.hasChildren || a.familyStatus !== 'Not recommended for children') &&
            currentRunningTotal + a.costSGD <= formData.budgetSGD
        );
      }

      // Fallback: allow activities for this slot even if used on earlier days if unique pool exhausted
      if (candidates.length === 0) {
        candidates = destActivities.filter(
          a =>
            a.timeSlot === slot &&
            (!formData.hasChildren || a.familyStatus !== 'Not recommended for children') &&
            currentRunningTotal + a.costSGD <= formData.budgetSGD
        );
      }

      // Final Fallback: allow any valid slot activity for baseline rendering
      if (candidates.length === 0) {
        candidates = destActivities.filter(
          a =>
            a.timeSlot === slot &&
            (!formData.hasChildren || a.familyStatus !== 'Not recommended for children')
        );
      }

      if (candidates.length > 0) {
        candidates.sort((a, b) => {
          const aPref = formData.preferences.includes(a.category) ? 1 : 0;
          const bPref = formData.preferences.includes(b.category) ? 1 : 0;
          if (aPref !== bPref) return bPref - aPref;
          return a.costSGD - b.costSGD;
        });

        const selected = candidates[0];

        if (currentRunningTotal + selected.costSGD <= formData.budgetSGD || currentRunningTotal === 0) {
          if (slot === 'Morning') dayItinerary.morning = selected;
          if (slot === 'Afternoon') dayItinerary.afternoon = selected;
          if (slot === 'Evening') dayItinerary.evening = selected;

          usedActivityIds.add(selected.id);
          daySelectedIds.push(selected.id);
          currentRunningTotal += selected.costSGD;
          dayItinerary.dayCostSGD += selected.costSGD;
          dayItinerary.dayCost = dayItinerary.dayCostSGD;
        } else {
          unfilledSlotsCount++;
        }
      } else {
        unfilledSlotsCount++;
      }
    }

    dayItinerary.selectedActivityIds = daySelectedIds;
    days.push(dayItinerary);
  }

  if (currentRunningTotal > formData.budgetSGD) {
    warnings.push(
      `Trip itinerary total (${formatCurrency(currentRunningTotal, currency)}) slightly exceeds your stated budget of ${formatCurrency(formData.budgetSGD, currency)}.`
    );
  } else if (unfilledSlotsCount > 0 && currentRunningTotal >= formData.budgetSGD * 0.9) {
    warnings.push(
      `Budget ceiling reached! Some slots were left open to keep total under ${formatCurrency(formData.budgetSGD, currency)}.`
    );
  }

  const remainingBudgetSGD = Math.max(0, formData.budgetSGD - currentRunningTotal);

  return {
    destination: formData.destination,
    destinationInfo: destInfo,
    startDate: formData.startDate,
    endDate: formData.endDate,
    numDays,
    budgetSGD: formData.budgetSGD,
    currency,
    totalCostSGD: currentRunningTotal,
    remainingBudgetSGD,
    days,
    travelerType: formData.travelerType || 'Couple',
    hasChildren: formData.hasChildren,
    selectedPreferences: formData.preferences,
    isBudgetDeficit,
    minBudgetNeededSGD: minNeededForTrip,
    unfilledSlotsCount,
    emptyStateReason,
    warnings,
    suggestions
  };
}

/**
 * Get replacement activity options for a specific day and slot
 */
export function getReplacementOptions(
  destination: DestinationId,
  slot: 'Morning' | 'Afternoon' | 'Evening',
  hasChildren: boolean,
  currentPlanActivityIds: string[]
): Activity[] {
  return ACTIVITIES.filter(a => {
    if (a.destination !== destination) return false;
    if (a.timeSlot !== slot) return false;
    if (currentPlanActivityIds.includes(a.id)) return false;
    if (hasChildren && a.familyStatus === 'Not recommended for children') return false;
    return true;
  });
}

