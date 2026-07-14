import { NextResponse } from 'next/server';

// POST /api/review
// کد کاربر رو می‌گیره و از Gemini API فیدبک می‌گیره
export async function POST(request: Request) {
  const { code, challenge } = await request.json();

  // پرامپت فارسی برای Gemini — نقش مربی برنامه‌نویسی
  const prompt = `
تو یه مربی برنامه‌نویسی هستی. کاربر داره چالش زیر رو حل می‌کنه:
عنوان: ${challenge.title}
توضیح: ${challenge.description}

کد کاربر:
${code}

لطفاً کد رو بررسی کن و فیدبک بده:
۱. آیا منطق درسته؟
۲. چه مشکلی داره؟ (اگه داره)
۳. چطور می‌شه بهترش کرد؟

جواب رو به فارسی و کوتاه بده.
`;

  // ارسال به Gemini API — key از .env.local میاد، نه مستقیم تو کد
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  const data = await res.json();

  // استخراج متن از ساختار پاسخ Gemini
  const feedback = data.candidates?.[0]?.content?.parts?.[0]?.text || 'خطا در دریافت پاسخ';

  return NextResponse.json({ feedback });
}