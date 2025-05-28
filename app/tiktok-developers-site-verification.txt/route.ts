import { NextResponse } from 'next/server'

export async function GET() {
  const verificationCode = 'tiktok-developers-site-verification=bKSlKyoQXJqztrqmqymqTWCVFwcx4Z0b'
  
  return new NextResponse(verificationCode, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}
