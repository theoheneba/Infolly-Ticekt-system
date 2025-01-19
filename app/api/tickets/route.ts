import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { createTicket, getTickets } from '@/lib/db'

export async function POST(request: Request) {
  const session = await getServerSession()
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { subject, message } = await request.json()

  const ticket = await createTicket(session.user.id, subject, message)

  return NextResponse.json(ticket)
}

export async function GET(request: Request) {
  const session = await getServerSession()
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')

  const tickets = await getTickets(session.user.id, page, limit)

  return NextResponse.json(tickets)
}

