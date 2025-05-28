import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const error = searchParams.get('error')

  // Handle OAuth errors
  if (error) {
    console.error('TikTok OAuth error:', error)
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/?error=oauth_failed`)
  }

  // Verify state parameter
  if (state !== 'mood-sync-auth') {
    console.error('Invalid state parameter')
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/?error=invalid_state`)
  }

  if (!code) {
    console.error('No authorization code received')
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/?error=no_code`)
  }

  try {
    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_key: process.env.TIKTOK_CLIENT_ID!,
        client_secret: process.env.TIKTOK_CLIENT_SECRET!,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: process.env.TIKTOK_REDIRECT_URI!,
      }),
    })

    const tokenData = await tokenResponse.json()

    if (!tokenResponse.ok) {
      console.error('Token exchange failed:', tokenData)
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/?error=token_failed`)
    }

    // Get user info
    const userResponse = await fetch('https://open.tiktokapis.com/v2/user/info/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
      },
    })

    const userData = await userResponse.json()

    if (!userResponse.ok) {
      console.error('User info fetch failed:', userData)
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/?error=user_info_failed`)
    }

    // In a real app, you would save the user data and tokens to your database here
    console.log('TikTok user authenticated:', userData.data.user)

    // Redirect to success page with user info
    const successUrl = new URL(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard`)
    successUrl.searchParams.set('connected', 'true')
    successUrl.searchParams.set('username', userData.data.user.display_name || 'User')

    return NextResponse.redirect(successUrl.toString())

  } catch (error) {
    console.error('OAuth callback error:', error)
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/?error=callback_failed`)
  }
}
