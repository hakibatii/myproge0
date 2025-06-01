
export type SubscriptionType = 'basic' | 'premium' | 'professional' | 'enterprise';

export interface UpgradeFormData {
  idFront: File | null;
  idBack: File | null;
  selfie: File | null;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
  acceptTerms: boolean;
  subscriptionType?: SubscriptionType;
  paymentReference?: string;
}
