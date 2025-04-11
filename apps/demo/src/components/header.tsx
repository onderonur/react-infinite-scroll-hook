'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header className="flex flex-col gap-2">
      <div>
        <Link href="/" className="text-2xl font-black">
          Infinite List
        </Link>
        <p className="text-xl font-bold">
          Created by using `react-infinite-scroll-hook`
        </p>
      </div>
      <label htmlFor="pathname" className="font-semibold">
        Demo
        <select
          id="pathname"
          className="ml-2 rounded border p-1"
          value={pathname}
          onChange={(e) => {
            router.push(e.target.value);
          }}
        >
          <option value="/" disabled>
            -- Select --
          </option>
          <option value="/window-scroll">Window Scroll</option>
          <option value="/vertical-element-scroll">
            Vertical Element Scroll
          </option>
          <option value="/horizontal-element-scroll">
            Horizontal Element Scroll
          </option>
          <option value="/reverse-window-scroll">Reverse Window Scroll</option>
          <option value="/reverse-vertical-element-scroll">
            Reverse Vertical Element Scroll
          </option>
          <option value="/reverse-horizontal-element-scroll">
            Reverse Horizontal Element Scroll
          </option>
        </select>
      </label>
    </header>
  );
}
