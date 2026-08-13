import { CurrencyCode } from './utils/currency';

export type ActivityCategory =
  | 'Outdoor & Nature'
  | 'Adventure'
  | 'Historical & Monuments'
  | 'Galleries & Museums'
  | 'Food & Dining'
  | 'Relaxation';

export type FamilyFriendlyStatus =
  | 'Family-friendly'
  | 'Not recommended for children'
  | 'Conditional';

export type TravelerType = 'Solo (Female)' | 'Solo (Male)' | 'Couple' | 'Family';

export type TimeSlot = 'Morning' | 'Afternoon' | 'Evening';

export type DestinationId =
  | 'Kuala Lumpur'
  | 'Penang'
  | 'Melaka'
  | 'Sabah'
  | 'Sarawak'
  | 'Kedah & Langkawi'
  | 'Pahang'
  | 'Perak'
  | 'Selangor'
  | 'Johor'
  | 'Terengganu'
  | 'Kelantan'
  | 'Negeri Sembilan'
  | 'Perlis';

export interface DestinationInfo {
  id: DestinationId;
  name: string;
  country: string;
  tagline: string;
  description: string;
  coverImage: string;
  minDailyBudgetSGD: number;
  avgDailyBudgetSGD: number;
  highlights: string[];
}

export interface Activity {
  id: string;
  destination: DestinationId;
  name: string;
  description: string;
  category: ActivityCategory;
  costSGD: number;
  timeSlot: TimeSlot;
  familyStatus: FamilyFriendlyStatus;
  familyNote?: string;
  soloNoteFemale?: string;
  soloNoteMale?: string;
  imageUrl: string;
  location: string;
  estimatedHours: number;
}

export interface TripFormData {
  destination: DestinationId;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  budgetSGD: number;
  currency: CurrencyCode;
  travelerType: TravelerType;
  preferences: ActivityCategory[];
  hasChildren: boolean;
}

export interface DayItinerary {
  dayNumber: number;
  dateStr: string;
  formattedDate: string;
  selectedActivityIds: string[]; // List of activity IDs currently selected for this day
  availableActivities: Activity[]; // All matching activities eligible for this day
  dayCostSGD: number; // Running total for this day in base SGD
  // Backward compatibility pointers:
  morning?: Activity;
  afternoon?: Activity;
  evening?: Activity;
  dayCost: number; // Same as dayCostSGD
}

export interface ItineraryPlan {
  destination: DestinationId;
  destinationInfo: DestinationInfo;
  startDate: string;
  endDate: string;
  numDays: number;
  budgetSGD: number;
  currency: CurrencyCode;
  totalCostSGD: number;
  remainingBudgetSGD: number;
  days: DayItinerary[];
  travelerType: TravelerType;
  hasChildren: boolean;
  selectedPreferences: ActivityCategory[];
  
  // Edge cases & diagnostic info
  isBudgetDeficit: boolean;
  minBudgetNeededSGD: number;
  unfilledSlotsCount: number;
  emptyStateReason?: string;
  warnings: string[];
  suggestions: {
    label: string;
    actionType: 'RAISE_BUDGET' | 'REMOVE_FILTER' | 'SHORTEN_TRIP' | 'ALLOW_CONDITIONAL';
    suggestedValue?: number | ActivityCategory;
  }[];
}

export interface SavedTrip {
  id: string;
  createdAt: string;
  formData: TripFormData;
  plan: ItineraryPlan;
}

