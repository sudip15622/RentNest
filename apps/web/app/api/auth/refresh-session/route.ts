import { NextRequest, NextResponse } from 'next/server';
import { getSession, createSession, deleteSession } from '../../../../lib/session';
import { refreshToken } from '../../../../lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const redirectTo = searchParams.get('redirectTo') || '/';
    
    const session = await getSession();
    
    if (!session?.refreshToken) {
      await deleteSession();
      // Add a refresh parameter to trigger page reload
      return NextResponse.redirect(new URL(`/login?redirectTo=${redirectTo}&refresh=true`, request.url));
    }

    // Get new tokens from backend
    const tokenResult = await refreshToken(session.refreshToken);
    
    if (!tokenResult) {
      await deleteSession();
      // Add a refresh parameter to trigger page reload
      return NextResponse.redirect(new URL(`/login?redirectTo=${redirectTo}&refresh=true`, request.url));
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
    await deleteSession();
    // Add a refresh parameter to trigger page reload
    return NextResponse.redirect(new URL('/login?refresh=true', request.url));
  }
}
