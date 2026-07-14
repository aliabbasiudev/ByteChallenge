import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { code, challenge } = await request.json();

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
  console.log('Gemini full response:', JSON.stringify(data));

  const feedback = data.candidates?.[0]?.content?.parts?.[0]?.text || 'خطا در دریافت پاسخ';

  return NextResponse.json({ feedback });
}