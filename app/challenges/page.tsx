import { Metadata } from 'next';
import ChallengesList from '../_components/ChallengesList';

export const metadata: Metadata = {
  title: 'چالش‌ها — ByteChallenge',
  description: '۴۰ چالش JavaScript از آسان تا سخت — آرایه، رشته، توابع و منطق',
};

export default async function ChallengesPage() {
  try {
    const res = await fetch('http://localhost:3000/api/challenges');
    if (!res.ok) throw new Error('Failed to fetch');
    const challenges = await res.json();

    return (
      <main className="min-h-screen bg-background">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-12">
            چالش‌ها
          </h1>
          <ChallengesList challenges={challenges} />
        </div>
      </main>
    );
  } catch (error) {
    return (
      <main className="min-h-screen bg-background">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="text-center text-red-400">خطا در بارگذاری داده‌ها</div>
        </div>
      </main>
    );
  }
}
