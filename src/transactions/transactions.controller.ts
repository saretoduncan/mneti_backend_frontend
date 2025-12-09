import { Body, Controller, Get, HttpCode, Post, Req } from '@nestjs/common';
import { HttpStatusCode } from 'axios';
import type { Request } from 'express';
import type {
  IMpesaAccountBalanceCallback,
  IMpesaSTKCallback,
} from 'src/dtos/mpesa.dto';
import { CreateTransactionDto } from 'src/dtos/transactions.dto';
import { TransactionsService } from './transactions.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionService: TransactionsService) {}

  @ApiOperation({ summary: 'M-Pesa STK Callback Webhook' })
  @Post('/stk/callback')
  @HttpCode(HttpStatusCode.Ok)
  async getStkCallback(@Body() req: IMpesaSTKCallback) {
    await this.transactionService.saveSubscriptionTransaction(req);
    return { message: 'success' };
  }
  @ApiOperation({ summary: 'Get Mpesa Balance' })
  @Get('/mpesa/balance')
  @HttpCode(HttpStatusCode.Ok)
  async getMpesaBalance() {
    return await this.transactionService.requestMpesaBalance();
  }
  @ApiOperation({ summary: 'M-Pesa Balance Callback Webhook' })
  @Post('/bal/callback')
  @HttpCode(HttpStatusCode.Ok)
  async getBalanceCallback(@Body() body: IMpesaAccountBalanceCallback) {
    await this.transactionService.handleMpesaBalanceCallback(body);
    return { message: 'success' };
  }
  @ApiOperation({ summary: 'Initiate subscription via STK Push' })
  @ApiBody({ type: CreateTransactionDto })
  @Post('/subscribe')
  @HttpCode(HttpStatusCode.Ok)
  async subscribe(@Body() body: CreateTransactionDto) {
    return await this.transactionService.initiateSubscription(
      body.userProfileId,
      body.phoneNumber,
    );
  }
}
