'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const text = '< ByteChallenge />';

export default function Hero() {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

useEffect(() => {
  let i = 0;
  let deleting = false;
  let pause = false;

  const interval = setInterval(() => {
    if (pause) return;

    if (!deleting) {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i === text.length) {
       
        pause = true;
        setTimeout(() => { pause = false; deleting = true; }, 3000);
      }
    } else {
      setDisplayed(text.slice(0, i - 1));
      i--;
      if (i === 0) {
        deleting = false;
      }
    }
  }, 170); 

  return () => clearInterval(interval);
}, []);

  return (
    <section className="flex flex-col items-center justify-center text-center py-12 sm:py-16 px-4">
      <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-primary font-mono mb-6 min-h-[1.2em]">
        {displayed}
        <span className={`inline-block w-[3px] h-[1em] bg-primary ml-1 align-middle ${done ? 'animate-pulse' : ''}`} />
      </h1>
      <p className="text-muted-foreground text-sm sm:text-base md:text-xl max-w-xl mb-10">
        مهارت‌های JavaScript و TypeScript خودت رو با حل چالش‌های واقعی تقویت کن
      </p>
      <Link
        href="/challenges"
        className="px-5 py-2 sm:px-8 sm:py-3 bg-primary text-background rounded-lg font-semibold hover:bg-primary/90 transition-colors text-sm sm:text-base md:text-lg"
      >
        شروع چالش‌ها ←
      </Link>
    </section>
  );
}