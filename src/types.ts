export interface InvitationData {
  celebrantName: string;
  celebrantSubtitle: string;
  badgeText: string;
  messageText: string;
  eventDayName: string;
  eventDateDisplay: string;
  eventDateIso: string;
  venueName: string;
  venueAddress: string;
  venueCity: string;
  googleMapsQuery: string;
  scheduleTime: string;
  dressCode: string;
  dressCodeSubtext?: string;
  whatsappNumber: string;
  bankAlias: string;
  bankCbu?: string;
  bankHolder?: string;
  bankEntity?: string;
  coverImage: string;
  childhoodImage: string;
  audioTrackName: string;
  audioTrackUrl?: string;
  instagramUser?: string;
  tiktokUser?: string;
  driveFolderUrl?: string;
}

export interface RsvpEntry {
  id: string;
  fullName: string;
  attending: boolean;
  companionsCount: number;
  dietaryRestriction: string;
  customDietary?: string;
  songSuggestion?: string;
  message?: string;
  createdAt: string;
}

export interface SharedPhoto {
  id: string;
  url: string;
  author: string;
  caption?: string;
  timestamp: string;
}
