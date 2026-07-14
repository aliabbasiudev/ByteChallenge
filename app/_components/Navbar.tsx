// app/_components/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/challenges', label: 'Challenges' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-border bg-card px-4 sm:px-6 py-4 flex items-center">
      <Link href="/" className="text-primary font-mono font-bold text-lg sm:text-xl">
        {'<ByteChallenge />'}
      </Link>

      {/* دسکتاپ */}
      <nav className="hidden sm:flex flex-1 justify-center gap-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm transition-colors hover:text-primary ${
              pathname === link.href ? 'text-primary font-medium' : 'text-muted-foreground'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* موبایل */}
      <div className="sm:hidden ml-auto">
        <Sheet open={open} onOpenChange={setOpen}>
         <SheetTrigger>
             <button className="text-muted-foreground hover:text-primary transition-colors">
              <Menu className="w-6 h-6" />
             </button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-card border-border w-64">
            <nav className="flex flex-col gap-6 mt-8">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`text-base transition-colors hover:text-primary ${
                    pathname === link.href ? 'text-primary font-medium' : 'text-muted-foreground'
                  }`}
                >
                  {link.href === '/' ? '🏠 ' : link.href === '/challenges' ? '⚡ ' : 'ℹ️ '}
                  {link.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}