import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { code, challenge } = await request.json();

const prompt = `شما یک متخصص بررسی کد هستید. لطفاً کد زیر را تحلیل کنید و فقط فیدبک فنی بدهید:

**چالش:** ${challenge.title}
**توضیح:** ${challenge.description}

**کد کاربر:**
\`\`\`javascript
${code}
\`\`\`

لطفاً به این سوالات پاسخ بدید:
1. آیا منطق کد درست است؟
2. چه اشتباه یا مشکلی دارد؟
3. چطور می‌توان بهتر کرد؟

جواب را فقط به فارسی و خلاصه بدهید.`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': process.env.GEMINI_API_KEY || '',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await res.json();
    const feedback = data.candidates?.[0]?.content?.parts?.[0]?.text || 'خطا';

    return NextResponse.json({ feedback });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ feedback: 'خطای سرور' }, { status: 500 });
  }
}