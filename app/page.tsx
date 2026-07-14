import type { Metadata } from 'next';
import Hero from './_components/Hero';
import Stats from './_components/Stats';
import Categories from './_components/Categories';

export const metadata: Metadata = {
  title: 'ByteChallenge — تمرین JavaScript و TypeScript',
  description: 'مهارت‌های JavaScript و TypeScript خودت رو با حل چالش‌های واقعی تقویت کن',
};
export default function HomePage() {
  return (
    <main>
      <Hero />
      <Stats />
      <Categories />
    </main>
  );
}