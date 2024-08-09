import { forwardRef } from 'react';

type ListProps = React.PropsWithChildren & {
  direction?: 'vertical' | 'horizontal';
};

export function List({ direction, ...rest }: ListProps) {
  return (
    <ul
      className={`p-2 ${direction === 'horizontal' ? 'flex' : 'block'}`}
      {...rest}
    />
  );
}

type ListItemProps = React.PropsWithChildren;

export const ListItem = forwardRef<React.ElementRef<'li'>, ListItemProps>(
  function ListItem(props, ref) {
    return <li ref={ref} className="m-1 border bg-slate-200 p-2" {...props} />;
  },
);

export function Loading() {
  return (
    <div className="animate-pulse bg-slate-600 p-2 text-white">Loading...</div>
  );
}
