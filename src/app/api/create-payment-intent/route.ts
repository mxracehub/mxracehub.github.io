import { NextResponse } from 'next/server';

// This feature is temporarily unavailable.
export async function POST() {
  return NextResponse.json(
    { error: 'This feature is temporarily unavailable.' },
    { status: 503 }
  );
}
