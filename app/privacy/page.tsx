import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPage() {
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
            <CardTitle className="text-3xl text-center">Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p className="text-lg mb-4">
              MyMoodSync respects your privacy. We do not collect, store, or share any personally identifiable information.
            </p>
            <p className="mb-4">
              The app only uses the TikTok API to retrieve authorized public information as permitted by the user. No data is used for third-party purposes.
            </p>
            <p className="font-semibold">
              By using this application, you consent to the practices outlined in this Privacy Policy.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
