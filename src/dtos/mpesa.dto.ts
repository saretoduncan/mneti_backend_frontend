export interface IOAuthResponseDto {
  access_token: string;
  expires_in: number;
}
export interface IMpesaStkRequest {
  BusinessShortCode: number;
  Password: string;
  Timestamp: string; // YYYYMMDDHHMMSS
  TransactionType: string;
  Amount: string | number;
  PartyA: string;
  PartyB: string;
  PhoneNumber: string;
  CallBackURL: string;
  AccountReference: string;
  TransactionDesc: string;
}

export interface IStkPushResponse {
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResponseCode: string;
  ResponseDescription: string;
  CustomerMessage: string;
}
export interface IMpesaAccountBalanceSyncResponse {
  OriginatorConversationID: string;
  ConversationID: string;
  ResponseCode: string; // "0" means accepted for processing
  ResponseDescription: string;
}
export interface IMpesaSTKCallback {
  Body: {
    stkCallback: {
      MerchantRequestID: string;
      CheckoutRequestID: string;
      ResultCode: number;
      ResultDesc: string;
      CallbackMetadata: {
        Item: Array<{
          Name:
            | 'Amount'
            | 'MpesaReceiptNumber'
            | 'TransactionDate'
            | 'PhoneNumber'
            | string;
          Value: number | string;
        }>;
      };
    };
  };
}
export interface IMpesaAccountBalanceRequest {
  Initiator: string;
  SecurityCredential: string;
  CommandID: string;
  PartyA: string | number;
  IdentifierType: string | number;
  Remarks: string;
  QueueTimeOutURL: string;
  ResultURL: string;
}

export interface IMpesaAccountBalanceCallback {
  Result: {
    ResultType: string;
    ResultCode: number; // 0 = success
    ResultDesc: string;
    OriginatorConversationID: string;
    ConversationID: string;
    TransactionID: string;

    ResultParameters?: {
      ResultParameter: Array<{
        Key: string;
        Value: string | number;
      }>;
    };

    ReferenceData?: {
      ReferenceItem: {
        Key: string;
        Value: string;
      };
    };
  };
}
