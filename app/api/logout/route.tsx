import { NextRequest, NextResponse } from 'next/server';

/**
 * Handles logout by clearing the authentication token cookie
 * 
 * @param _request - The incoming HTTP request
 * @returns Response that clears the token cookie
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
