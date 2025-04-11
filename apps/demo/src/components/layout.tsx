'use client';

import { usePathname } from 'next/navigation';

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const pathname = usePathname();

  return (
    <div
      className={`flex gap-4 p-4 ${pathname === '/reverse-window-scroll' ? 'flex-col-reverse' : 'flex-col'}`}
    >
      {children}
    </div>
  );
}
