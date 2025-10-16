import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID as string;
const authToken = process.env.TWILIO_AUTH_TOKEN as string;
const fromNumber = process.env.TWILIO_FROM as string;

const client = twilio(accountSid, authToken);

export default async function createMessage(to: string, body: string) {
  const message = await client.messages.create({ body, from: fromNumber, to });
  return message;
}