import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ msg: 'here is a GET response!' }, { status: 201 })
}
