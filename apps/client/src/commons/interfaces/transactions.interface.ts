export interface ITotalReferalReponse {
  totalReferals: number;
}

export interface IMinimumWalletAmountReponse {
  id: string;
  name: string;
  amount: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface IWalletResponse {
  id: string;
  balance: number;
  userProfileId: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface IWithdrawRequest {
  phoneNumber: string;
  userProfileId: string;
  amount: number;
}