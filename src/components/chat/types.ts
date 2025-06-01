
export interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  isVerified?: boolean;
  status?: string;
  userType?: string;
  plan?: string;
  badge?: string;
  points?: number;
}

export interface Message {
  id: string;
  text: string;
  sentByMe: boolean;
  timestamp: string;
  isAudioMessage?: boolean;
  audioUrl?: string;
  audioDuration?: number;
  isPaymentOption?: boolean;
  isFeedbackRequest?: boolean;
  requiresResponse?: boolean;
}

export interface PaymentSelection {
  option: 'cash' | 'card';
  timestamp: string;
  tripId: string;
}

export interface ReferralInfo {
  code: string;
  usedCount: number;
  pointsEarned: number;
}
