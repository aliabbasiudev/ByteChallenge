'use client';

import { useState, useEffect } from 'react';
import CodeEditor from './CodeEditor';

type Challenge = {
  id: number;
  title: string;
  description: string;
  starterCode: string;
};

export default function ChallengeDetail({ challenge }: { challenge: Challenge }) {
  // کنترل نمایش editor
  const [showEditor, setShowEditor] = useState(false);
  // کد فعلی کاربر — با starterCode شروع میشه
  const [code, setCode] = useState(challenge.starterCode);
  // فیدبک دریافتی از AI
  const [feedback, setFeedback] = useState('');
  // وضعیت loading هنگام درخواست به AI
  const [loading, setLoading] = useState(false);
  // آیا این چالش قبلاً حل شده؟
  const [solved, setSolved] = useState(false);

  // چک کردن localStorage برای دیدن اینکه آیا این چالش قبلاً حل شده
  useEffect(() => {
    const solvedList = JSON.parse(localStorage.getItem('solved') || '[]');
    setSolved(solvedList.includes(challenge.id));
  }, [challenge.id]);

  // ذخیره‌ی id چالش تو localStorage به‌عنوان حل‌شده
  function markAsSolved() {
    const solvedList = JSON.parse(localStorage.getItem('solved') || '[]');
    // جلوگیری از اضافه شدن تکراری
    if (!solvedList.includes(challenge.id)) {
      solvedList.push(challenge.id);
      localStorage.setItem('solved', JSON.stringify(solvedList));
    }
    setSolved(true);
  }

  // ارسال کد به Route Handler که اون رو به Gemini API می‌فرسته
  async function handleReview() {
    setLoading(true);
    setFeedback('');
    const res = await fetch('/api/review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, challenge }),
    });
    const data = await res.json();
    setFeedback(data.feedback);
    setLoading(false);
  }

  return (
    <div>
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setShowEditor(!showEditor)}
          className="px-6 py-2 bg-primary text-background rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          {showEditor ? 'بستن editor' : 'حل کردن'}
        </button>
        <button
          onClick={markAsSolved}
          className={`px-6 py-2 rounded-lg font-semibold transition-colors border ${
            solved
              ? 'border-green-400 text-green-400 bg-green-400/10'
              : 'border-border text-muted-foreground hover:border-primary/50'
          }`}
        >
          {solved ? '✓ حل شده' : 'علامت‌گذاری به‌عنوان حل‌شده'}
        </button>
      </div>

      {showEditor && (
        <div className="mb-6">
          <CodeEditor starterCode={code} onChange={setCode} />
          <button
            onClick={handleReview}
            disabled={loading}
            className="mt-4 px-6 py-2 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors disabled:opacity-50"
          >
            {loading ? 'در حال بررسی...' : 'بررسی کد با AI'}
          </button>
        </div>
      )}

      {feedback && (
        <div className="border border-border bg-card rounded-lg p-6">
          <h3 className="text-lg font-semibold text-primary mb-3">فیدبک AI</h3>
          <p className="text-muted-foreground leading-7 whitespace-pre-wrap">{feedback}</p>
        </div>
      )}
    </div>
  );
}