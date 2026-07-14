export default function Loading() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground text-sm ">در حال بارگذاری...</p>
      </div>
    </main>
  );
}