import jwt, { Secret, SignOptions } from "jsonwebtoken";

const SECRET: Secret = process.env.JWT_SECRET!;

export const generateToken = (payload: Record<string, string | number | boolean>, expiresIn: string | number = '24h'): string => {
  return jwt.sign(payload, SECRET, { expiresIn } as SignOptions);
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
};

export const decodeToken = (token: string) => {
  return jwt.decode(token);
};