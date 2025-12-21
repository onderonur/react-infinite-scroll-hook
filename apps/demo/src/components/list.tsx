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

type LoadingProps = {
  ref?: React.Ref<HTMLDivElement>;
};

export function Loading({ ref }: LoadingProps) {
  return (
    <div ref={ref} className="p-1">
      <div className="animate-pulse bg-slate-600 p-4 text-white">
        Loading...
      </div>
    </div>
  );
}
