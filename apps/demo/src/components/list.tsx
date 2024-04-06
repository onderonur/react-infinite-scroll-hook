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
    return <li ref={ref} className="bg-slate-200 border p-2 m-1" {...props} />;
  },
);

export function Loading() {
  return (
    <div className="animate-pulse p-2 bg-slate-600 text-white">Loading...</div>
  );
}
