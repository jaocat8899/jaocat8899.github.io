import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get("code")
    const state = searchParams.get("state")
    const error = searchParams.get("error")
    const errorDescription = searchParams.get("error_description")

    console.log("TikTok callback received:", {
      code: code ? "Present" : "Missing",
      state: state ? "Present" : "Missing",
      error,
      errorDescription,
    })

    // Handle OAuth errors
    if (error) {
      console.error("TikTok OAuth error:", error, errorDescription)
      const errorUrl = new URL(`${process.env.NEXT_PUBLIC_APP_URL}/`)
      errorUrl.searchParams.set("error", "oauth_failed")
      errorUrl.searchParams.set("details", errorDescription || error)
      return NextResponse.redirect(errorUrl.toString())
    }

    if (!code) {
      console.error("No authorization code received")
      const errorUrl = new URL(`${process.env.NEXT_PUBLIC_APP_URL}/`)
      errorUrl.searchParams.set("error", "no_code")
      return NextResponse.redirect(errorUrl.toString())
    }

    // Exchange authorization code for access token
    const tokenRequestBody = new URLSearchParams({
      client_key: process.env.TIKTOK_CLIENT_ID!,
      client_secret: process.env.TIKTOK_CLIENT_SECRET!,
      code: code,
      grant_type: "authorization_code",
      redirect_uri: process.env.TIKTOK_REDIRECT_URI!,
    })

    console.log("Exchanging code for token...")

    const tokenResponse = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cache-Control": "no-cache",
      },
      body: tokenRequestBody,
    })

    const tokenData = await tokenResponse.json()

    console.log("Token response status:", tokenResponse.status)
    console.log("Token response:", tokenData)

    if (!tokenResponse.ok) {
      console.error("Token exchange failed:", tokenData)
      const errorUrl = new URL(`${process.env.NEXT_PUBLIC_APP_URL}/`)
      errorUrl.searchParams.set("error", "token_failed")
      errorUrl.searchParams.set("details", tokenData.error_description || "Token exchange failed")
      return NextResponse.redirect(errorUrl.toString())
    }

    // Get user info
    console.log("Fetching user info...")
    const userResponse = await fetch("https://open.tiktokapis.com/v2/user/info/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        "Content-Type": "application/json",
      },
    })

    const userData = await userResponse.json()

    console.log("User response status:", userResponse.status)
    console.log("User data:", userData)

    if (!userResponse.ok) {
      console.error("User info fetch failed:", userData)
      const errorUrl = new URL(`${process.env.NEXT_PUBLIC_APP_URL}/`)
      errorUrl.searchParams.set("error", "user_info_failed")
      errorUrl.searchParams.set("details", userData.error?.message || "Failed to fetch user info")
      return NextResponse.redirect(errorUrl.toString())
    }

    // In a real app, you would save the user data and tokens to your database here
    console.log("TikTok user authenticated successfully")

    // Redirect to success page with user info
    const successUrl = new URL(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard`)
    successUrl.searchParams.set("connected", "true")
    successUrl.searchParams.set(
      "username",
      userData.data?.user?.display_name || userData.data?.user?.username || "User",
    )

    return NextResponse.redirect(successUrl.toString())
  } catch (error) {
    console.error("OAuth callback error:", error)
    const errorUrl = new URL(`${process.env.NEXT_PUBLIC_APP_URL}/`)
    errorUrl.searchParams.set("error", "callback_failed")
    errorUrl.searchParams.set("details", error instanceof Error ? error.message : "Unknown callback error")
    return NextResponse.redirect(errorUrl.toString())
  }
}
