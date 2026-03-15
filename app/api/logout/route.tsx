import { NextRequest, NextResponse } from 'next/server';

/**
 * Clears authentication token cookie and logs user out.
 * Sets token cookie maxAge to 0 to delete it from browser.
 *
 * @param _request - HTTP request (unused)
 * @return Success response with cleared token cookie
 * @category Authentication
 * @security Clears session token from secure cookie
 * @performance Realtime cookie clearing
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export async function POST(_request: NextRequest): Promise<NextResponse> {
  try {
    const response = NextResponse.json({success: true, message: "Logged out successfully"}, {status: 200});
    response.cookies.set({name: "token", value: "", maxAge: 0, path: "/"});
    return response;
  } catch (_error) {
    return NextResponse.json({success: false, error: "Logout failed"}, {status: 400});
  }
}
