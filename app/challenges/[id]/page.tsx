import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ChallengeDetail from '../../_components/ChallengeDetail';
import { challenges } from '../../_data/challenges';

type Difficulty = 'easy' | 'medium' | 'hard';

const difficultyColor: Record<Difficulty, string> = {
  easy: 'text-green-400 border-green-400/30 bg-green-400/10',
  medium: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
  hard: 'text-red-400 border-red-400/30 bg-red-400/10',
};

const difficultyLabel: Record<Difficulty, string> = {
  easy: 'آسان',
  medium: 'متوسط',
  hard: 'سخت',
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  // مستقیم از داده‌های محلی می‌خونیم — نیازی به fetch نیست
  const challenge = challenges.find((c) => c.id === Number(id));
  
  // اگه چالش پیدا نشد، صفحه 404 نشون بده
  if (!challenge) return notFound();

  return (
    <main>
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <Link
          href="/challenges"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 transition-colors"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          بازگشت به چالش‌ها
        </Link>

        <div className="mb-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              {challenge.title}
            </h1>
            <span
              className={`text-xs px-4 py-2 rounded-lg border font-mono flex-shrink-0 ${
                difficultyColor[challenge.difficulty as Difficulty]
              }`}
            >
              {difficultyLabel[challenge.difficulty as Difficulty]}
            </span>
          </div>
          {challenge.category && (
            <p className="text-muted-foreground">
              دسته‌بندی: <span className="text-foreground font-mono">{challenge.category}</span>
            </p>
          )}
        </div>

        <div className="border border-border bg-card rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-3">توضیحات</h2>
          <p className="text-muted-foreground leading-relaxed">
            {challenge.description}
          </p>
        </div>

        {challenge.starterCode && (
          <div className="border border-border bg-card rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-3">کد شروع</h2>
            <pre className="bg-background rounded-lg p-4 overflow-x-auto border border-border/50">
              <code className="text-sm font-mono text-green-400">
                {challenge.starterCode}
              </code>
            </pre>
          </div>
        )}

        <ChallengeDetail challenge={challenge} />
      </div>
    </main>
  );
}