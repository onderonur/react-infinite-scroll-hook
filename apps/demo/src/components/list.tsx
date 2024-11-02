import { forwardRef } from 'react';

type ListProps = {
  direction?: 'vertical' | 'horizontal';
  children: React.ReactNode;
};

export function List({ direction, ...rest }: ListProps) {
  return (
    <ul
      className={`p-2 ${direction === 'horizontal' ? 'flex' : 'block'}`}
      {...rest}
    />
  );
}

type ListItemProps = {
  children: React.ReactNode;
};

export const ListItem = forwardRef<React.ComponentRef<'li'>, ListItemProps>(
  function ListItem(props, ref) {
    return <li ref={ref} className="m-1 border bg-slate-200 p-2" {...props} />;
  },
);

export function Loading() {
  return (
    <div className="animate-pulse bg-slate-600 p-2 text-white">Loading...</div>
  );
}
