import { DynamicModule, Module } from "@nestjs/common";
import { MailService } from "./mail.service";
import nodemailer from "nodemailer";
import { BullModule } from "@nestjs/bull";
import { MailOptions } from "./types";
import { MailProcessor } from "./mail.processor";

@Module({
  imports: [
    BullModule.registerQueue({
      name: "mail",
    }),
  ],
})
export class MailModule {
  static forRoot(options: MailOptions): DynamicModule {
    const transporter = nodemailer.createTransport(options);
    return {
      module: MailModule,
      providers: [
        {
          provide: "TRANSPORTER",
          useValue: transporter,
        },
        {
          provide: "MAIL_OPTIONS",
          useValue: options,
        },
        MailService,
        MailProcessor,
      ],
      exports: [MailService],
    };
  }
}
