import { NextResponse } from 'next/server';
import { challenges } from '../../../_data/challenges';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const challenge = challenges.find((c) => c.id === Number(id));

  if (!challenge) {
    return NextResponse.json({ error: 'چالش پیدا نشد' }, { status: 404 });
  }

  return NextResponse.json(challenge);
}