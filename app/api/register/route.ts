import { NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { createUser } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()
    const hashedPassword = await hash(password, 12)
    
    await createUser(email, hashedPassword, name, 'customer')
    
    return NextResponse.json({ message: 'User created successfully' }, { status: 201 })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ message: 'An error occurred during registration' }, { status: 500 })
  }
}

