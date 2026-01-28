import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Simple auth validation (replace with real auth in production)
    if (email === 'tokobajudewi@gmail.com' && password === 'tokobaju123@') {
      const response = NextResponse.json({ 
        success: true, 
        message: 'Login successful' 
      });

      // Set authentication cookie from server-side
      response.cookies.set('isAuthenticated', 'true', {
        httpOnly: false, // Allow client-side access if needed
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Login failed' },
      { status: 500 }
    );
  }
}
