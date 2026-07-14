'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

type Challenge = {
  id: number;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
};

const difficultyColor = {
  easy: 'text-green-400 border-green-400/30 bg-green-400/10',
  medium: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
  hard: 'text-red-400 border-red-400/30 bg-red-400/10',
};

const difficultyLabel = {
  easy: 'آسان',
  medium: 'متوسط',
  hard: 'سخت',
};

export default function ChallengesList({ challenges }: { challenges: Challenge[] }) {
  // گرفتن پارامترهای URL — مثلاً /challenges?category=array
  const searchParams = useSearchParams();

  const [difficulty, setDifficulty] = useState<string>('all');
  // اگه از homepage روی یه category کلیک شد، اونو مقدار اولیه بذار
  const [category, setCategory] = useState<string>(
    searchParams.get('category') || 'all'
  );

  const categories = ['all', ...Array.from(new Set(challenges.map((c) => c.category)))];

  const filtered = challenges.filter((c) => {
    const diffMatch = difficulty === 'all' || c.difficulty === difficulty;
    const catMatch = category === 'all' || c.category === category;
    return diffMatch && catMatch;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      <div className="flex flex-wrap gap-3 mb-8">
        {/* فیلتر difficulty */}
        <div className="flex gap-2">
          {['all', 'easy', 'medium', 'hard'].map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`px-5 py-2 rounded-lg border text-xs transition-all ${
                difficulty === d
                  ? 'border-primary text-primary bg-primary/10'
                  : 'border-border text-muted-foreground hover:border-primary/50'
              }`}
            >
              {d === 'all' ? 'همه' : d === 'easy' ? 'آسان' : d === 'medium' ? 'متوسط' : 'سخت'}
            </button>
          ))}
        </div>

        {/* فیلتر category کشویی */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-1 rounded-lg border border-border text-xs bg-card text-muted-foreground focus:outline-none focus:border-primary transition-all"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'همه دسته‌ها' : cat}
            </option>
          ))}
        </select>
      </div>

      {/* لیست چالش‌ها */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((challenge) => (
          <Link key={challenge.id} href={`/challenges/${challenge.id}`} className="block">
            <div className="border border-border bg-card rounded-xl p-5 hover:border-primary/50 transition-all hover:-translate-y-1 cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs px-4 py-0.5 rounded-lg ${difficultyColor[challenge.difficulty]}`}>
                  {difficultyLabel[challenge.difficulty]}
                </span>
                <span className="text-xs text-muted-foreground font-mono">
                  {challenge.category}
                </span>
              </div>
              <h3 className="text-foreground font-medium text-sm sm:text-base">
                {challenge.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground mt-12">چالشی پیدا نشد</p>
      )}
    </div>
  );
}