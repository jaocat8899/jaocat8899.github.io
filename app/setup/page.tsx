import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Key, Globe, Lock } from 'lucide-react'
import Link from "next/link"

export default function SetupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-6"
        >
          ← Back to Home
        </Link>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl">Environment Variables Setup</CardTitle>
            <CardDescription>
              Configure these environment variables for MyMoodSync deployment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* TikTok API Variables */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Key className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold">TikTok API Configuration</h3>
                <Badge variant="destructive">Required</Badge>
              </div>
              <div className="space-y-3 text-sm">
                <div className="bg-gray-50 p-3 rounded">
                  <code className="font-mono">TIKTOK_CLIENT_ID</code>
                  <p className="text-gray-600 mt-1">Your TikTok app's client ID from TikTok Developer Portal</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <code className="font-mono">TIKTOK_CLIENT_SECRET</code>
                  <p className="text-gray-600 mt-1">Your TikTok app's client secret (keep this secure!)</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <code className="font-mono">TIKTOK_REDIRECT_URI</code>
                  <p className="text-gray-600 mt-1">OAuth callback URL (e.g., https://yourdomain.com/api/tiktok/callback)</p>
                </div>
              </div>
            </div>

            {/* Public Variables */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold">Public Configuration</h3>
                <Badge variant="secondary">Client-side</Badge>
              </div>
              <div className="space-y-3 text-sm">
                <div className="bg-gray-50 p-3 rounded">
                  <code className="font-mono">NEXT_PUBLIC_APP_URL</code>
                  <p className="text-gray-600 mt-1">Your app's public URL (e.g., https://mymoodsync.vercel.app)</p>
                </div>
              </div>
            </div>

            {/* Database Variables */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Lock className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold">Database Configuration</h3>
                <Badge variant="outline">Optional</Badge>
              </div>
              <div className="space-y-3 text-sm">
                <div className="bg-gray-50 p-3 rounded">
                  <code className="font-mono">DATABASE_URL</code>
                  <p className="text-gray-600 mt-1">PostgreSQL connection string for storing mood data</p>
                </div>
              </div>
            </div>

            {/* Deployment Instructions */}
            <div className="border-t pt-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Code className="w-5 h-5" />
                Deployment Instructions
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Create a <code className="bg-gray-100 px-1 rounded">.env.local</code> file in your project root</li>
                <li>Add all environment variables to your Vercel project settings</li>
                <li>Set <code className="bg-gray-100 px-1 rounded">NEXT_PUBLIC_APP_URL</code> to your production domain</li>
                <li>Configure TikTok Developer Portal with your production callback URL</li>
                <li>Deploy using <code className="bg-gray-100 px-1 rounded">vercel --prod</code></li>
              </ol>
            </div>

            {/* TikTok Verification */}
            <div className="border-t pt-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Globe className="w-5 h-5" />
                TikTok Domain Verification
              </h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm mb-2">
                  <strong>Verification file included:</strong> <code className="bg-white px-1 rounded">tiktok-developers-site-verification.txt</code>
                </p>
                <p className="text-sm text-blue-700">
                  This file will be automatically served at <code className="bg-white px-1 rounded">/tiktok-developers-site-verification.txt</code> 
                  to verify your domain with TikTok's developer platform.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
