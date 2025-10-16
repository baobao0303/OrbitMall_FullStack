import jwt from 'jsonwebtoken';

interface User {
  _id: string;
  name: string;
  email: string;
  fullName: string;
}

// Get JWT secret from environment or use a fallback (not recommended for production)
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-in-production';

export default function generateAccessToken(id: string) {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '1h' });
}

export async function generateToken(user: User) {
  const accessToken = await jwt.sign(
    { id: user._id, name: user.name, email: user.email, fullName: user.fullName },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
  const refreshToken = await jwt.sign(
    { id: user._id, name: user.name, email: user.email, fullName: user.fullName },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
}
