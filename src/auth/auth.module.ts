import { UserModule } from "@/user";
import { Module } from "@nestjs/common";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { MailModule } from "@/common/shared/mail/mail.module";
import { BullModule } from "@nestjs/bull";

@Module({
  imports: [
    UserModule,
    MailModule.forRoot({
      queue: true,
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    }),
  ],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
