import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import type { AxiosError } from 'axios';
import moment from 'moment';

import {
  IMpesaAccountBalanceRequest,
  IMpesaAccountBalanceSyncResponse,
  IMpesaStkRequest,
  IOAuthResponseDto,
  IStkPushResponse,
} from 'src/dtos/mpesa.dto';

@Injectable()
export class MpesaService {
  private MPESA_API_URL: string;
  private MPESA_SHORTCODE: string;
  private MPESA_PASS_KEY: string;
  private MPESA_API_CONSUMER_KEY: string;
  private MPESA_API_CONSUMER_SECRET: string;
  private MPESA_CALLBACK_URL: string;
  private MPESA_INITIATOR_NAME: string;
  private MPESA_INITIATOR_PASSWORD: string;
  private MPESA_BALANCE_CALLBACK: string;

  constructor() {
    ((this.MPESA_API_URL = process.env.MPESA_API_URL!!),
      (this.MPESA_SHORTCODE = process.env.MPESA_API_SHORT_CODE!!),
      (this.MPESA_API_CONSUMER_KEY = process.env.MPESA_API_CONSUMER_KEY!!),
      (this.MPESA_API_CONSUMER_SECRET =
        process.env.MPESA_API_CONSUMER_SECRET!!),
      (this.MPESA_PASS_KEY = process.env.MPESA_API_PASS_KEY!!));
    ((this.MPESA_CALLBACK_URL = process.env.MPESA_API_STK_CALLBACK_URL!!),
      (this.MPESA_INITIATOR_NAME = process.env.MPESA_INITIATOR_NAME!!),
      (this.MPESA_INITIATOR_PASSWORD = process.env.MPESA_INITIATOR_PASSWORD!!),
      (this.MPESA_BALANCE_CALLBACK = process.env.MPESA_API_BALANCE_CALLBACK_URL!!));
  }

  private generatePassword() {
    const timestamp = moment().format('YYYYMMDDHHmmss');

    const pass = Buffer.from(
      `${this.MPESA_SHORTCODE}${this.MPESA_PASS_KEY}${timestamp}`,
    ).toString('base64');
    return { pass, timestamp };
  }
  async authoizeMpesa(): Promise<IOAuthResponseDto> {
    try {
      const auth = Buffer.from(
        `${this.MPESA_API_CONSUMER_KEY}:${this.MPESA_API_CONSUMER_SECRET}`,
      ).toString('base64');

      const resp = await axios.get(
        `${this.MPESA_API_URL}/oauth/v1/generate?grant_type=client_credentials`,
        { headers: { Authorization: `Basic ${auth}` } },
      );
      return resp.data;
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
  async sendStkPush(
    phone_number: string,
    amount: number,
  ): Promise<IStkPushResponse> {
    try {
      const { pass, timestamp } = this.generatePassword();
      const reqData: IMpesaStkRequest = {
        BusinessShortCode: Number(this.MPESA_SHORTCODE),
        Password: pass,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: phone_number,
        PartyB: this.MPESA_SHORTCODE,
        PhoneNumber: phone_number,
        CallBackURL: this.MPESA_CALLBACK_URL,
        AccountReference: 'MNETI',
        TransactionDesc: 'MNETI_DESC',
      };

      const auth = await this.authoizeMpesa();
      const res = await axios.post(
        `${this.MPESA_API_URL}/mpesa/stkpush/v1/processrequest`,
        reqData,
        {
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        },
      );

      return res.data;
    } catch (e) {
      throw new InternalServerErrorException(e.response.data.message);
    }
  }

  async checkBalance():Promise<IMpesaAccountBalanceSyncResponse> {
    try {
      const reqData: IMpesaAccountBalanceRequest = {
        Initiator: this.MPESA_INITIATOR_NAME,
        SecurityCredential: this.MPESA_INITIATOR_PASSWORD,
        CommandID: 'AccountBalance',
        PartyA: this.MPESA_SHORTCODE,
        IdentifierType: '4',
        Remarks: 'OK',
        QueueTimeOutURL: this.MPESA_BALANCE_CALLBACK,
        ResultURL: this.MPESA_BALANCE_CALLBACK,
      };
      const auth = await this.authoizeMpesa();
      const res = await axios.post(
        `${this.MPESA_API_URL}/mpesa/accountbalance/v1/query`,
        reqData,
        {
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        },
      );
      return res.data;
    } catch (e) {
      console.log(e.response);
      throw new InternalServerErrorException(e.response.data);
    }
  }
}
