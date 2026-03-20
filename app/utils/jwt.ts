import jwt, { Secret, SignOptions, JwtPayload } from "jsonwebtoken";

const SECRET: Secret = process.env.JWT_SECRET!;

export interface TokenPayload extends JwtPayload {
  userId: string;
  email: string;
  isAdmin: boolean;
}

/**
 * Generates a signed JWT token with the provided payload.
 * Uses JWT_SECRET from environment variables and default expiration of 24 hours.
 *
 * @param payload - Data to encode in token (userId, email, isAdmin, etc.)
 * @param expiresIn - Token expiration time (default: "24h")
 * @return Signed JWT token string
 * @category Authentication
 * @security Uses JWT_SECRET from environment
 * @performance O(1) token generation
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export const generateToken = (payload: Record<string, string | number | boolean>, expiresIn: string | number = "24h"): string => {
  return jwt.sign(payload, SECRET, { expiresIn } as SignOptions);
};

/**
 * Verifies a JWT token and extracts its payload.
 * Returns null if token is invalid, expired, or verification fails.
 *
 * @param token - JWT token string to verify
 * @return Decoded token payload if valid, null otherwise
 * @category Authentication
 * @security Validates JWT signature using secret key
 * @performance O(1) token verification
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export const verifyToken = (token: string): TokenPayload | null => {
  try {
    const verified = jwt.verify(token, SECRET) as TokenPayload;
    return verified;
  } catch {
    return null;
  }
};

/**
 * Decodes a JWT token without verifying signature.
 * Useful for inspecting token contents without validation.
 *
 * @param token - JWT token string to decode
 * @return Decoded token payload (unverified)
 * @category Authentication
 * @performance O(1) decoding operation
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export const decodeToken = (token: string) => {
  return jwt.decode(token);
};