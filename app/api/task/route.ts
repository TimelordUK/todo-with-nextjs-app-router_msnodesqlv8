import { NextRequest, NextResponse } from 'next/server'
import { TaskVerbs } from './TaskVerbs'

const verbs = new TaskVerbs()

export async function GET() {
  try {
    const tasks = await verbs.GET()
    return NextResponse.json({ data: tasks })
  } catch (e: any) {
    return NextResponse.json(
      { message: 'Internal Server Error ' + e.message },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const added = await verbs.POST(body)
    return NextResponse.json(
      { data: added, message: 'Task Added successfully' },
      { status: 201 }
    )
  } catch (e: any) {
    return NextResponse.json(
      { message: 'Internal Server Error ' + e.message },
      { status: 500 }
    )
  }
}
