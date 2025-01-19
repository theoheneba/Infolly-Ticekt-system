import { NextResponse } from 'next/server'
import { pool } from '@/lib/db'

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT 1 as test')
    return NextResponse.json({ message: 'Database connection successful', data: rows })
  } catch (error) {
    console.error('Database connection failed:', error)
    return NextResponse.json({ message: 'Database connection failed' }, { status: 500 })
  }
}

