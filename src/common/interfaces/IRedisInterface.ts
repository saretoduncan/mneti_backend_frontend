export interface IRedisTransactionMpesaMessage {
  mpesaTxId: string;
  status: 'success' | 'pending' | 'failed';
  message: string;
  amount: number;
  phone: string;
  userProfileId: string;
  referrerId?: string;
}
export interface IRedisBalance {
  mpesaTxId: string;
  status: 'success' | 'pending' | 'failed';
  message: string;
  balance?:string;
}
