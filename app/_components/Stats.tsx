'use client';

import { useEffect, useState } from 'react';

const TOTAL = 40;

export default function Stats() {
  const [mounted, setMounted] = useState(false);
  const [solved, setSolved] = useState(0);

  useEffect(() => {
    setMounted(true);
    const solvedList = JSON.parse(localStorage.getItem('solved') || '[]');
    setSolved(solvedList.length);
  }, []);

  const percent = Math.round((solved / TOTAL) * 100);

  if (!mounted) return null;

  return (
    <section className="max-w-5xl mx-auto px-16 sm:px-6 py-4 sm:py-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-8">
        <div className="border border-border bg-card rounded-lg p-2 sm:p-6 text-center">
          <p className="text-lg sm:text-4xl font-bold text-primary font-mono">{TOTAL}</p>
          <p className="text-muted-foreground mt-1 sm:mt-2 text-xs sm:text-base">کل چالش‌ها</p>
        </div>
        <div className="border border-border bg-card rounded-lg p-2 sm:p-6 text-center">
          <p className="text-lg sm:text-4xl font-bold text-green-400 font-mono">{solved}</p>
          <p className="text-muted-foreground mt-1 sm:mt-2 text-xs sm:text-base">حل شده</p>
        </div>
        <div className="border border-border bg-card rounded-lg p-2 sm:p-6 text-center">
          <p className="text-lg sm:text-4xl font-bold text-yellow-400 font-mono">{TOTAL - solved}</p>
          <p className="text-muted-foreground mt-1 sm:mt-2 text-xs sm:text-base">باقی‌مانده</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="border border-border bg-card rounded-lg p-3 sm:p-6">
        <div className="flex justify-between mb-2 sm:mb-3">
          <span className="text-muted-foreground text-xs sm:text-sm">پیشرفت کلی</span>
          <span className="text-primary font-mono text-xs sm:text-sm">{percent}%</span>
        </div>
        <div className="w-full bg-background rounded-full h-2 sm:h-3 border border-border">
          <div
            className="bg-primary h-2 sm:h-3 rounded-full transition-all duration-500 progress-animated"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </section>
  );
}