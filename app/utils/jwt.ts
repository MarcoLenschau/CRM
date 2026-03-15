import jwt, { Secret, SignOptions, JwtPayload } from "jsonwebtoken";

const SECRET: Secret = process.env.JWT_SECRET!;

export interface TokenPayload extends JwtPayload {
  userId: string;
  email: string;
  isAdmin: boolean;
}

export const generateToken = (payload: Record<string, string | number | boolean>, expiresIn: string | number = "24h"): string => {
  return jwt.sign(payload, SECRET, { expiresIn } as SignOptions);
};

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, SECRET) as TokenPayload;
  } catch {
    return null;
  }
};

export const decodeToken = (token: string) => {
  return jwt.decode(token);
};