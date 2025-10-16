import fs from 'fs/promises';
import path from 'path';
import nodemailer from 'nodemailer';
import Handlebars from 'handlebars';
import dotenv from 'dotenv';

dotenv.config();

export const EMAIL_TYPES = {
  INVITATION: 'invitation',
  PASSWORD_RESET: 'password_reset',
  WELCOME: 'welcome'
};

export interface EmailData {
  subject: string;
  data: any;
  typeEmail: string;
}

export const sendInviteEmail = async (to: string, data: EmailData) => {
  try {
    const templatePath = path.resolve(__dirname, `./templates/${data.typeEmail}_template.html`);
    const templateContent = await fs.readFile(templatePath, 'utf-8');
    const template = Handlebars.compile(templateContent);
    const html = template(data.data ?? {});

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER || '',
        pass: process.env.MAIL_PASS || ''
      }
    });

    const mailOptions = {
      from: `"${process.env.APP_NAME || 'Ecommerce App'}" <${process.env.GG_EMAIL || 'noreply@example.com'}>`,
      to,
      subject: data.subject,
      html
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Email sending failed:', error);
    // Don't throw error to prevent breaking the main flow
  }
};
