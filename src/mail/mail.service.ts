import { Injectable } from '@nestjs/common';
import Mailjet from 'node-mailjet';

@Injectable()
export class MailService {
  private mailjet: Mailjet;
  // private apiKey = process.env.MAIL_JET_API_KEY
  // private apiSecret = process.env.MAIL_JET_API_SECRET

  constructor() {
    this.mailjet = new Mailjet({
      apiKey: process.env.MAIL_JET_API_KEY,
      apiSecret: process.env.MAIL_JET_API_SECRET,
    });
  }

  async sendEmail(to: string, name: string, subject: string, message: string) {
    this.mailjet.post('send').request({
      Message: [
        {
          From: {
            Email: 'saretoduncan@gmail.com',
            Name: 'sareto',
          },
          To: [
            {
              Email: to,
              Name: name,
            },
          ],
          Subject: subject,
          HTMLPart: message,
        },
      ],
    });
  }
}
