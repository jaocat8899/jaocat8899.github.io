import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl text-center">Terms of Service</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p className="text-lg mb-4">
              Welcome to MyMoodSync. By accessing or using our application, you agree to be bound by these Terms of Service.
            </p>
            <p className="mb-4">
              This app is a lifestyle tool designed to help users reflect on their daily moods and activities through integrations with TikTok.
            </p>
            <p className="mb-4">
              We do not collect or store any personal data beyond what is required by TikTok's official API. Use of this application is at your own discretion.
            </p>
            <p className="font-semibold">
              If you do not agree to these terms, please do not use our service.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
