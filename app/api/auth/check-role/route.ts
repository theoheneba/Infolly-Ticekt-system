import { getServerSession } from "next-auth/next"
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ role: null }, { status: 401 })
  }

  return NextResponse.json({ role: session.user.role })
}

