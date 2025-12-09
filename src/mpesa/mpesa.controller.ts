import { Body, Controller, Get, Post } from '@nestjs/common';
import { MpesaService } from './mpesa.service';

@Controller('mpesa')
export class MpesaController {
    constructor(private readonly mpesaService:MpesaService){
       
    }
     @Get('/auth')
        async authMpesa(){
            return await this.mpesaService.authoizeMpesa()
        }
    
    @Post('/stkpush')
    async sendStkPush(@Body() req:{phoneNumber:string, amount:number}){
        console.log(req)
        return await this.mpesaService.sendStkPush(req.phoneNumber,req.amount)
    }
    @Get('/balance')
    async checkBalance(){
        return await this.mpesaService.checkBalance()
    }


    
}
