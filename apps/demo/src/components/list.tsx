import { forwardRef } from 'react';

type ListProps = {
  direction?: 'vertical' | 'horizontal';
  children: React.ReactNode;
};

export function List({ direction, ...rest }: ListProps) {
  return (
    <ul
      className={`flex ${direction === 'horizontal' ? 'flex-row' : 'flex-col'} gap-1`}
      {...rest}
    />
  );
}

type ListItemProps = {
  children: React.ReactNode;
};

export function ListItem(props: ListItemProps) {
  return <li className="border bg-slate-200 p-4" {...props} />;
}

export const Loading = forwardRef<React.ComponentRef<'div'>, unknown>(
  function Loading(props, ref) {
    return (
      <div ref={ref} className="p-1">
        <div className="animate-pulse bg-slate-600 p-4 text-white">
          Loading...
        </div>
      </div>
    );
  },
);
