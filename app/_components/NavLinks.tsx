'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-6">
      <Link
        href="/"
        className={`text-sm transition-colors hover:text-primary ${
          pathname === '/' ? 'text-primary font-medium' : 'text-muted-foreground'
        }`}
      >
        Home
      </Link>
      <Link
        href="/challenges"
        className={`text-sm transition-colors hover:text-primary ${
          pathname === '/challenges' ? 'text-primary font-medium' : 'text-muted-foreground'
        }`}
      >
        Challenges
      </Link>
      <Link
        href="/about"
        className={`text-base transition-colors hover:text-primary ${
         pathname === '/about' ? 'text-primary font-medium' : 'text-muted-foreground'
         }`}
       >
        About
      </Link>
    </nav>
  );
}