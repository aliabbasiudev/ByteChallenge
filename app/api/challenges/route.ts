import { NextResponse } from 'next/server';
import { challenges } from '../../_data/challenges';

// GET /api/challenges
// پارامترهای اختیاری: ?difficulty=easy&category=array
export async function GET(request: Request) {
  // گرفتن پارامترهای فیلتر از URL
  const { searchParams } = new URL(request.url);
  const difficulty = searchParams.get('difficulty');
  const category = searchParams.get('category');

  // شروع با همه‌ی چالش‌ها
  let filtered = challenges;

  // اگه difficulty داده شده، فقط اون‌هایی که match می‌کنن رو نگه دار
  if (difficulty) {
    filtered = filtered.filter((c) => c.difficulty === difficulty);
  }

  // اگه category داده شده، دوباره فیلتر کن
  if (category) {
    filtered = filtered.filter((c) => c.category === category);
  }

  return NextResponse.json(filtered);
}