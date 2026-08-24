export type ItineraryIconType =
  | "bus"
  | "map"
  | "camera"
  | "food"
  | "hotel"
  | "ticket"
  | "sunrise"
  | "shopping";

export interface ItineraryActivity {
  id: string;
  time: string;
  title: string;
  description: string;
  icon: ItineraryIconType;
  imageUrl?: string;
}

export interface ItineraryDay {
  id: string;
  label: string;
  title: string;
  activities: ItineraryActivity[];
}

export interface ItineraryDestination {
  slug: string;
  label: string;
  badge?: string;
  duration: string;
  days: ItineraryDay[];
}
