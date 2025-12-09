import { Body, Controller, Get, HttpCode, Patch, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { TransactionConfigService } from './transaction-config.service';
import { TxConfigRequestDto, TxConfigResponseDto } from 'src/dtos/txConfig.dto';

/**
 * Controller responsible for managing transaction configuration settings.
 * Provides endpoints to retrieve and update transaction-related configurations
 * such as subscription amount, minimum wallet amount, and commission amount.
 */
@Controller('transaction-config')
@ApiTags('Transaction Configurations')
export class TransactionConfigController {
  constructor(private readonly txService: TransactionConfigService) {}

  @ApiOperation({ summary: 'Retrieve all transaction configuration settings' })
  @ApiResponse({
    status: 200,
    type: TxConfigResponseDto,
    isArray: true,
    description: 'List of transaction configurations',
  })
  @HttpCode(200)
  @Get('all')
  async getAllTxConfig(): Promise<TxConfigResponseDto[]> {
    return await this.txService.findAllTx();
  }

  @ApiOperation({ summary: 'Retrieve a transaction configuration by its ID' })
  @ApiResponse({
    status: 200,
    type: TxConfigResponseDto,

    description: 'transaction configuration',
  })
  @HttpCode(200)
  @Get('configId')
  async getTxConfigById(@Query('id') id: string): Promise<TxConfigResponseDto> {
    return await this.txService.findTxById(id);
  }

  @ApiOperation({
    summary: 'Update the subscription amount in the transaction configuration',
  })
  @ApiBody({
    type: TxConfigRequestDto,
  })
  @ApiResponse({
    status: 200,
    type: TxConfigResponseDto,

    description: 'transaction configuration',
  })
  @HttpCode(200)
  @Patch('update/subscriptionAmount')
  async updateTxSubConfigAmount(
    @Body() body: TxConfigRequestDto,
  ): Promise<TxConfigResponseDto> {
    return await this.txService.updateSubscriptionAmount(body.amount);
  }

  @ApiOperation({
    summary:
      'Update the minimum wallet amount in the transaction configuration',
  })
  @ApiBody({
    type: TxConfigRequestDto,
  })
  @ApiResponse({
    status: 200,
    type: TxConfigResponseDto,

    description: 'transaction configuration',
  })
  @HttpCode(200)
  @Patch('update/minimumWalletAmont')
  async updateTxWalletConfigAmount(
    @Body() body: TxConfigRequestDto,
  ): Promise<TxConfigResponseDto> {
    return await this.txService.updateMinimumWalletAmount(body.amount);
  }

  @ApiOperation({
    summary:
      'Update the referral commission amount in the transaction configuration',
  })
  @ApiBody({
    type: TxConfigRequestDto,
  })
  @ApiResponse({
    status: 200,
    type: TxConfigResponseDto,

    description: 'transaction configuration',
  })
  @HttpCode(200)
  @Patch('update/commissionAmount')
  async updateTxCommissionConfigAmount(
    @Body() body: TxConfigRequestDto,
  ): Promise<TxConfigResponseDto> {
    return await this.txService.updateReferalCommissionAmount(body.amount);
  }
}
