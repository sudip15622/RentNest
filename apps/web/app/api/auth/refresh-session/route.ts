import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '../../../../lib/session';
import { refreshToken } from '../../../../lib/auth';
import { createSession } from '../../../../lib/session';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const redirectTo = searchParams.get('redirectTo') || '/';
    
    const session = await getSession();
    
    if (!session?.refreshToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Get new tokens from backend
    const tokenResult = await refreshToken(session.refreshToken);
    
    if (!tokenResult) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Update session with new tokens
    const newSession = {
      user: session.user,
      accessToken: tokenResult.accessToken,
      refreshToken: tokenResult.refreshToken,
    };
    
    await createSession(newSession);
    
    // Redirect back to the original page with fresh session
    return NextResponse.redirect(new URL(redirectTo, request.url));
    
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
