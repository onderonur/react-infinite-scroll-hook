import Link from 'next/link';
import { PageTitle } from '../components/page-title';

export default function HomePage() {
  return (
    <main>
      <PageTitle>Home</PageTitle>
      <p>
        Select one of the options to see the live demo and their source code.
      </p>
      <p>
        This is a very simple demo website for `react-infinite-scroll-hook` only
        to have some live demos for users.
      </p>
      <p>
        You can check the full source code and docs{' '}
        <Link
          href="https://github.com/onderonur/react-infinite-scroll-hook"
          className="font-semibold text-slate-600"
        >
          here
        </Link>
        .
      </p>
    </main>
  );
}
