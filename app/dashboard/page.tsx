"use client"

import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, CheckCircle, TrendingUp, Calendar, User } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const connected = searchParams.get("connected")
  const username = searchParams.get("username")

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Heart className="w-8 h-8 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-900">MyMoodSync Dashboard</h1>
          </div>
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </header>

        {/* Connection Status */}
        {connected && (
          <Card className="mb-8 border-green-200 bg-green-50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <CardTitle className="text-green-800">TikTok Connected Successfully!</CardTitle>
              </div>
              <CardDescription className="text-green-700">
                Welcome {username}! Your TikTok account is now connected to MyMoodSync.
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        {/* Dashboard Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* TikTok Connection Status */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  TikTok Account
                </CardTitle>
                {connected ? (
                  <Badge className="bg-green-100 text-green-800">Connected</Badge>
                ) : (
                  <Badge variant="secondary">Not Connected</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {connected ? (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Connected as: {username}</p>
                  <Button variant="outline" size="sm">
                    Manage Connection
                  </Button>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Connect your TikTok account to start tracking</p>
                  <Link href="/api/tiktok/auth">
                    <Button size="sm">Connect TikTok</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Mood Tracking */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Mood Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">Track your daily mood and emotions</p>
              <Button size="sm" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>

          {/* Activity Log */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Activity Log
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">View your mood and activity history</p>
              <Button size="sm" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Getting Started */}
        <Card>
          <CardHeader>
            <CardTitle>Getting Started with MyMoodSync</CardTitle>
            <CardDescription>Follow these steps to make the most of your mood tracking journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm font-semibold">
                  1
                </div>
                <div>
                  <h4 className="font-medium">Connect Your TikTok Account</h4>
                  <p className="text-sm text-gray-600">
                    {connected
                      ? "✅ Complete! Your TikTok account is connected."
                      : "Link your TikTok account to start syncing your social activity."}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-sm font-semibold">
                  2
                </div>
                <div>
                  <h4 className="font-medium">Start Mood Tracking</h4>
                  <p className="text-sm text-gray-600">Begin logging your daily moods and see patterns over time.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-sm font-semibold">
                  3
                </div>
                <div>
                  <h4 className="font-medium">Analyze Your Patterns</h4>
                  <p className="text-sm text-gray-600">
                    Discover insights about your mood patterns and social media activity.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
