import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'درباره ما — ByteChallenge',
  description: 'ByteChallenge با Next.js 16، TypeScript و Tailwind CSS ساخته شده',
};

export default function AboutPage() {
  return (
<main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
  <h1 className="text-2xl sm:text-3xl font-bold text-primary font-mono mb-4">
    {'<ByteChallenge />'}
  </h1>

  <section className="mb-8">
    <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-2">درباره پروژه</h2>
    <p className="text-muted-foreground leading-7 text-sm sm:text-base">
      ByteChallenge یه پلتفرم آموزشی برای تمرین مهارت‌های JavaScript و TypeScript هست.
      هدفش اینه که برنامه‌نویس‌ها با حل چالش‌های واقعی، مهارتشون رو تقویت کنن.
    </p>
  </section>

  <section className="mb-8">
    <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">ساخته شده با</h2>
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {[
         'Next.js 16',
         'React 19',
         'TypeScript',
         'Tailwind CSS v4',
         'shadcn/ui',
         'Monaco Editor',
         'Lucide React',
         'App Router',
         'Route Handlers',
         'Server Components',
         'Gemini AI API',
      ].map((tech) => (
        <span
          key={tech}
          className="px-3 py-1 rounded-full border border-border text-xs sm:text-sm text-muted-foreground font-mono bounce-hover"
        >
          {tech}
        </span>
      ))}
    </div>
  </section>

  <section>
    <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-2">توسعه‌دهنده</h2>
    <p className="text-muted-foreground text-sm sm:text-base">
      این پروژه توسط <span className="text-primary font-medium">Ali</span> ساخته شده.
    </p>
      <a  
href="https://github.com/aliabbasiudev"
  target="_blank"
  className="inline-block mt-3 text-sm text-primary hover:text-white hover:drop-shadow-lg hover:scale-110 transition-all duration-200 font-mono"
>
  github.com/aliabbasiudev →
</a>
      </section>
    </main>
  );
}
