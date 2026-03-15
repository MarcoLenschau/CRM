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
    console.log("🔐 Verifying token with SECRET length:", process.env.JWT_SECRET?.length);
    const verified = jwt.verify(token, SECRET) as TokenPayload;
    console.log("🔐 Token verified successfully:", verified.email);
    return verified;
  } catch (error) {
    console.log("🔐 Token verification failed:", error instanceof Error ? error.message : String(error));
    return null;
  }
};

export const decodeToken = (token: string) => {
  return jwt.decode(token);
};