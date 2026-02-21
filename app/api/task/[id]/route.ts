import { NextRequest, NextResponse } from 'next/server'
import { TaskVerbs } from '../TaskVerbs'

const verbs = new TaskVerbs()

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await verbs.DELETE(id)
    return NextResponse.json(
      { data: null, message: 'Task Deleted successfully' }
    )
  } catch (e: any) {
    return NextResponse.json(
      { message: 'Internal Server Error ' + e.message },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const updated = await verbs.PUT(id, body)
    return NextResponse.json(
      { data: updated, message: 'Task Updated successfully' }
    )
  } catch (e: any) {
    return NextResponse.json(
      { message: 'Internal Server Error ' + e.message },
      { status: 500 }
    )
  }
}
