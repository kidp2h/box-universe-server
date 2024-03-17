import SMTPTransport from "nodemailer/lib/smtp-transport";

export type MetadataMail = {
  subject: string;
};

export type TemplateMail = {
  path: string;
  variables: Record<string, string | number>;
};

export type MailOptions = SMTPTransport.Options & { queue: boolean };
