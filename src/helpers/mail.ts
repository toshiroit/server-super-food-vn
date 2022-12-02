import nodemailer, { SendMailOptions } from 'nodemailer';
import config from '../config/config';

const transporter = nodemailer.createTransport({
  host: config.node_mail_host,
  port: Number(config.node_mail_port) || 587,
  auth: {
    user: config.node_mailer_user,
    pass: config.node_mailer_pass,
  },
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
});
const mainOptions = ({ from, to, subject, text, html }: SendMailOptions): SendMailOptions => {
  const sendMailOptions: SendMailOptions = {
    from,
    to,
    subject,
    text,
    html,
  };
  return sendMailOptions;
};
export const sendMail = async ({ from, to, subject, text, html }: SendMailOptions) => {
  return transporter.sendMail(mainOptions({ from, to, subject, text, html }));
};
