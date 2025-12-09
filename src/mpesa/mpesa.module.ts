import { Global, Module } from '@nestjs/common';
import { MpesaService } from './mpesa.service';
import { MpesaController } from './mpesa.controller';

@Global()
@Module({
  providers: [MpesaService],
  exports: [MpesaService],
  controllers: [MpesaController],
})
export class MpesaModule {}
