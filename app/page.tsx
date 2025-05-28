"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Heart, TrendingUp, Users, Shield, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

function HomeContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")
  const details = searchParams.get("details")

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <header className="p-6 border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Heart className="w-8 h-8 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-900">MyMoodSync</h1>
          </div>
          <nav className="flex gap-4">
            <Link href="/privacy" className="text-gray-600 hover:text-purple-600">
              Privacy
            </Link>
            <Link href="/terms" className="text-gray-600 hover:text-purple-600">
              Terms
            </Link>
          </nav>
        </div>
      </header>

      {/* Error Alert */}
      {error && (
        <div className="max-w-4xl mx-auto px-6 pt-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Connection Error:</strong> {error === "oauth_failed" && "TikTok OAuth failed"}
              {error === "no_code" && "No authorization code received"}
              {error === "token_failed" && "Token exchange failed"}
              {error === "user_info_failed" && "Failed to fetch user information"}
              {error === "callback_failed" && "OAuth callback failed"}
              {details && ` - ${details}`}
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Track Your Mood, <span className="text-purple-600">Sync Your Life</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A lifestyle tool designed to help you reflect on your daily moods and activities through seamless TikTok
            integration.
          </p>
          <Link href="/api/tiktok/auth">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
              Connect with TikTok
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Why Choose MyMoodSync?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <TrendingUp className="w-12 h-12 text-purple-600 mb-4" />
                <CardTitle>Mood Tracking</CardTitle>
                <CardDescription>Reflect on your daily emotions and track patterns over time</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="w-12 h-12 text-purple-600 mb-4" />
                <CardTitle>TikTok Integration</CardTitle>
                <CardDescription>Connect your social media activity with your mood insights</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="w-12 h-12 text-purple-600 mb-4" />
                <CardTitle>Privacy First</CardTitle>
                <CardDescription>Your data stays private - we only use what's required by TikTok's API</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-6 h-6 text-purple-600" />
            <span className="font-semibold">MyMoodSync</span>
          </div>
          <div className="flex justify-center gap-6 text-sm text-gray-600">
            <Link href="/privacy" className="hover:text-purple-600">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-purple-600">
              Terms of Service
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-4">© 2024 MyMoodSync. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  )
}
