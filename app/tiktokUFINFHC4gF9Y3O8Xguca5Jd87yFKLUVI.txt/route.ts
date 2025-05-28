import { NextResponse } from "next/server"

export async function GET() {
  const verificationCode = "tiktok-site-verification=tiktokUFINFHC4gF9Y3O8Xguca5Jd87yFKLUVI"

  return new NextResponse(verificationCode, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  })
}
