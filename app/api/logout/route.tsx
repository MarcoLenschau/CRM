import { NextRequest, NextResponse } from 'next/server';

/**
 * Logout user by clearing authentication token
 *
 * @param {NextRequest} _request - HTTP request
 * @returns {Promise<NextResponse>} Success response with cleared token cookie
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
