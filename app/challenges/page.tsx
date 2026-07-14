import { Metadata } from 'next';
import ChallengesList from '../_components/ChallengesList';
import { challenges } from '../_data/challenges'; 

export const metadata: Metadata = {
  title: 'چالش‌ها — ByteChallenge',
  description: '۴۰ چالش JavaScript از آسان تا سخت — آرایه، رشته، توابع و منطق',
};


export default async function ChallengesPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-8">
        چالش‌ها
      </h1>
      <ChallengesList challenges={challenges} />
    </main>
  );
}