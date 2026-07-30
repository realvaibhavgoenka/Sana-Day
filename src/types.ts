export interface PhotoMemory {
  id: string;
  url: string;
  title: string;
  date?: string;
  note: string;
}

export interface ScratchCardItem {
  id: string;
  title: string;
  percentage: number;
  batteryText: string;
  message: string;
  color: string;
}

export interface DateOption {
  id: string;
  title: string;
  iconName: string;
  description: string;
}

export interface AppConfig {
  girlfriendName: string;
  nickname: string;
  boyfriendName: string;
  subtitleMessage: string;
  envelopeTitle: string;
  envelopeSubtitle: string;
  bouquetHeading: string;
  bouquetSubheading: string;
  letterTitle: string;
  letterSubtitle: string;
  letterBody: string;
  letterClosing: string;
  reelUrl?: string;
  reelVideoUrl?: string;
  reelCaption?: string;
  reelAudioTrack?: string;
  musicUrl?: string;
  musicTitle?: string;
  memories: PhotoMemory[];
  scratchCards: ScratchCardItem[];
  dateActivities: DateOption[];
  romanticLocations: DateOption[];
  foodChoices: DateOption[];
}

export interface DatePlanResponse {
  date: string;
  time: string;
  activity: string;
  location: string;
  food: string;
  specialNote: string;
  submittedAt: string;
}
