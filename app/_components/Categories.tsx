import Link from 'next/link';

const categories = [
  { name: 'array', label: 'آرایه', icon: '[]', count: 14 },
  { name: 'string', label: 'رشته', icon: '" "', count: 8 },
  { name: 'object', label: 'آبجکت', icon: '{}', count: 4 },
  { name: 'function', label: 'تابع', icon: 'fn()', count: 8 },
  { name: 'logic', label: 'منطق', icon: '?:', count: 6 },
];

export default function Categories() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6">
        دسته‌بندی‌ها
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={`/challenges?category=${cat.name}`}
            className="border border-border bg-card rounded-lg p-4 text-center hover:border-primary/50 hover:-translate-y-1 transition-all"
          >
            <p className="text-2xl font-mono text-primary mb-2">{cat.icon}</p>
            <p className="text-foreground font-medium text-sm">{cat.label}</p>
            <p className="text-muted-foreground text-xs mt-1 font-mono">{cat.count} چالش</p>
          </Link>
        ))}
      </div>
    </section>
  );
}