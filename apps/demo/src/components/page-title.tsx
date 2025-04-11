import Link from 'next/link';

type PageTitleProps = {
  filePath?: string;
  children: React.ReactNode;
};

export function PageTitle({ filePath, children }: PageTitleProps) {
  return (
    <div className="pb-2">
      <h1 className="text-xl font-semibold">{children}</h1>
      {filePath && (
        <Link
          className="font-semibold text-slate-600"
          href={`https://github.com/onderonur/react-infinite-scroll-hook/blob/main/${filePath}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          Source Code
        </Link>
      )}
    </div>
  );
}
