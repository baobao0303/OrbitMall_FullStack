import { Response } from 'express';

export default function sendTokenViaCookie(res: Response, accessToken: string) {
  res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, maxAge: 1000 * 60 * 60 * 24 * 30 });
}
