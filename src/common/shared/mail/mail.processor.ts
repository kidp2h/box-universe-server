import {
  OnQueueActive,
  OnQueueFailed,
  OnQueueWaiting,
  Process,
  Processor,
} from "@nestjs/bull";
import { Inject, Logger } from "@nestjs/common";
import { Job } from "bull";
import { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

@Processor("mail")
export class MailProcessor {
  private readonly logger = new Logger(MailProcessor.name);
  constructor(
    @Inject("TRANSPORTER")
    private readonly transporter: Transporter<SMTPTransport.SentMessageInfo>,
  ) {}

  @Process("sendTemplate")
  async handleSendTemplate(job: Job) {
    this.logger.debug("Start job sending mail...");
    this.transporter.sendMail(job.data);
    this.logger.debug("Completed job send mail");
  }
}
