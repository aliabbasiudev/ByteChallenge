import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-24 flex flex-col items-center justify-center text-center">
      <div className="flex font-mono font-bold text-8xl text-primary mb-4">
{['4', '0', '4'].map((char, i) => (
  <span
    key={i}
    className="drop-char"
    style={{ animationDelay: `${i * 0.15}s` }}
  >
    {char}
  </span>
))}
      </div>
      <h1 className="text-2xl font-bold text-foreground mb-2">صفحه پیدا نشد</h1>
      <p className="text-muted-foreground mb-8">صفحه‌ای که دنبالش می‌گردی وجود نداره</p>
      <Link
        href="/"
        className="px-6 py-2 bg-primary text-background rounded-lg font-semibold hover:bg-primary/90 transition-colors"
      >
        برگشت به خونه
      </Link>
    </main>
  );
}