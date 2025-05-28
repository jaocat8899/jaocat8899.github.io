import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Environment variables for TikTok API integration
  const clientId = process.env.TIKTOK_CLIENT_ID
  const clientSecret = process.env.TIKTOK_CLIENT_SECRET
  const redirectUri = process.env.TIKTOK_REDIRECT_URI || `${process.env.NEXT_PUBLIC_APP_URL}/api/tiktok/callback`

  // Check if required environment variables are set
  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: 'TikTok API credentials not configured' },
      { status: 500 }
    )
  }

  // TikTok OAuth URL
  const authUrl = new URL('https://www.tiktok.com/auth/authorize/')
  authUrl.searchParams.set('client_key', clientId)
  authUrl.searchParams.set('scope', 'user.info.basic')
  authUrl.searchParams.set('response_type', 'code')
  authUrl.searchParams.set('redirect_uri', redirectUri)
  authUrl.searchParams.set('state', 'mood-sync-auth')

  return NextResponse.redirect(authUrl.toString())
}

// Add this new route handler after the existing GET function
export async function POST() {
  // Test endpoint to verify environment variables (for development only)
  const envCheck = {
    tiktokClientId: !!process.env.TIKTOK_CLIENT_ID,
    tiktokClientSecret: !!process.env.TIKTOK_CLIENT_SECRET,
    tiktokRedirectUri: !!process.env.TIKTOK_REDIRECT_URI,
    appUrl: process.env.NEXT_PUBLIC_APP_URL,
    allConfigured: !!(
      process.env.TIKTOK_CLIENT_ID && 
      process.env.TIKTOK_CLIENT_SECRET && 
      process.env.TIKTOK_REDIRECT_URI &&
      process.env.NEXT_PUBLIC_APP_URL
    )
  }

  return NextResponse.json(envCheck)
}
