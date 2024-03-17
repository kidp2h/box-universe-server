import { Inject, Injectable, Logger } from "@nestjs/common";
import { MailOptions, MetadataMail, TemplateMail } from "./types";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { Transporter } from "nodemailer";
import { renderFile } from "ejs";
import Mail from "nodemailer/lib/mailer";
import { Queue } from "bull";
import { InjectQueue } from "@nestjs/bull";

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  constructor(
    @Inject("TRANSPORTER")
    private readonly transporter: Transporter<SMTPTransport.SentMessageInfo>,
    @Inject("MAIL_OPTIONS")
    private readonly options: MailOptions,
    @InjectQueue("mail") private readonly mailQueue: Queue,
  ) {}

  async sendTemplate(
    email: string,
    metadata: MetadataMail,
    template: TemplateMail,
  ) {
    const html = await renderFile(template.path, template.variables);
    const mail: Mail.Options = {
      from: this.options.auth?.user,
      sender: this.options.auth?.user,
      to: email,
      subject: metadata.subject,
      html,
    };

    if (this.options.queue) {
      try {
        return this.mailQueue.add("sendTemplate", mail, {
          removeOnComplete: true,
          removeOnFail: true,
        });
      } catch (error) {
        this.logger.error(`Failed to add job to queue: ${error}`);
      }
    } else {
      try {
        return this.transporter.sendMail(mail);
      } catch (error) {
        this.logger.error(`Failed to send mail: ${error}`);
        return null;
      }
    }
  }
}
