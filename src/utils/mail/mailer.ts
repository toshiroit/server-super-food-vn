import nodemailer, { SendMailOptions } from 'nodemailer';
import config from '../../config/config';

const smtp = {
  host: config.mailer_host,
  user: config.mailer_user,
  pass: config.mailer_pass,
  port: config.mailer_port,
  secure: config.mailer_secure,
};
console.log(smtp);
const transporter = nodemailer.createTransport({
  ...smtp,
  secure: false,
  auth: {
    user: smtp.user,
    pass: smtp.pass,
  },
});

async function sendEmail(payload: SendMailOptions) {
  transporter.sendMail(payload, (err, info) => {
    if (err) {
      console.log('Error sending Email', err);
    }
    console.log(`Preview URL : ${nodemailer.getTestMessageUrl(info)}`);
  });
}

export default sendEmail;
