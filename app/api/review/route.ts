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

  try {
const res = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await res.json();
    console.log('Gemini Response:', JSON.stringify(data, null, 2));

    if (!res.ok) {
      console.error('Gemini Error:', data);
      return NextResponse.json(
        { feedback: `خطا: ${data.error?.message || 'خطای نامشخص'}` },
        { status: res.status }
      );
    }

    const feedback = data.candidates?.[0]?.content?.parts?.[0]?.text || 'خطا در دریافت پاسخ';

    return NextResponse.json({ feedback });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ feedback: 'خطای سرور' }, { status: 500 });
  }
}