import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Environment variables for TikTok API integration
    const clientId = process.env.TIKTOK_CLIENT_ID
    const clientSecret = process.env.TIKTOK_CLIENT_SECRET
    const redirectUri = process.env.TIKTOK_REDIRECT_URI || `${process.env.NEXT_PUBLIC_APP_URL}/api/tiktok/callback`

    // Check if required environment variables are set
    if (!clientId) {
      console.error("TIKTOK_CLIENT_ID is not set")
      return NextResponse.json({ error: "TikTok Client ID not configured" }, { status: 500 })
    }

    if (!clientSecret) {
      console.error("TIKTOK_CLIENT_SECRET is not set")
      return NextResponse.json({ error: "TikTok Client Secret not configured" }, { status: 500 })
    }

    if (!redirectUri) {
      console.error("TIKTOK_REDIRECT_URI is not set")
      return NextResponse.json({ error: "TikTok Redirect URI not configured" }, { status: 500 })
    }

    // Log for debugging (remove in production)
    console.log("TikTok OAuth Config:", {
      clientId: clientId ? "Set" : "Not set",
      redirectUri,
      appUrl: process.env.NEXT_PUBLIC_APP_URL,
    })

    // Generate a random state for security
    const state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

    // TikTok OAuth URL - Updated to use correct endpoint
    const authUrl = new URL("https://www.tiktok.com/v2/auth/authorize/")
    authUrl.searchParams.set("client_key", clientId)
    authUrl.searchParams.set("scope", "user.info.basic,user.info.profile")
    authUrl.searchParams.set("response_type", "code")
    authUrl.searchParams.set("redirect_uri", redirectUri)
    authUrl.searchParams.set("state", state)

    console.log("Redirecting to TikTok OAuth URL:", authUrl.toString())

    return NextResponse.redirect(authUrl.toString())
  } catch (error) {
    console.error("TikTok OAuth setup error:", error)
    return NextResponse.json(
      {
        error: "Failed to initialize TikTok OAuth",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

// Test endpoint to verify environment variables
export async function POST() {
  try {
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
      ),
      redirectUriResolved: process.env.TIKTOK_REDIRECT_URI || `${process.env.NEXT_PUBLIC_APP_URL}/api/tiktok/callback`,
    }

    return NextResponse.json(envCheck)
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to check environment variables",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
