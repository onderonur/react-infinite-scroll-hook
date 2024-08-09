import useInfiniteScroll from 'react-infinite-scroll-hook';
import { useLoadItems } from '../utils';
import { List, ListItem, Loading } from './list';

export function InfiniteListWithHorizontalScroll() {
  const { loading, items, hasNextPage, error, loadMore } = useLoadItems();

  const [infiniteRef, { rootRef }] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: Boolean(error),
    rootMargin: '0px 400px 0px 0px',
  });

  return (
    <div ref={rootRef} className="max-w-[600px] overflow-auto bg-slate-100">
      <List direction="horizontal">
        {items.map((item) => (
          <ListItem key={item.key}>{item.value}</ListItem>
        ))}
        {hasNextPage && (
          <ListItem ref={infiniteRef}>
            <Loading />
          </ListItem>
        )}
      </List>
    </div>
  );
}