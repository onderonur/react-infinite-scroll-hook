import { useCallback, useLayoutEffect, useMemo, useRef } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { useLoadItems } from '../utils';
import { List, ListItem, Loading } from './list';

export function InfiniteListWithReverseHozirontalScroll() {
  const { loading, items, hasNextPage, error, loadMore } = useLoadItems();

  const [infiniteRef, { rootRef }] = useInfiniteScroll({
    loading,
    hasNextPage,
    // TODO: Will check this
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onLoadMore: loadMore,
    disabled: !!error,
    rootMargin: '0px 0px 0px 400px',
  });

  const scrollableRootRef = useRef<React.ElementRef<'div'> | null>(null);
  const lastScrollDistanceToRightRef = useRef<number>();

  const reversedItems = useMemo(() => [...items].reverse(), [items]);

  // We keep the scroll position when new items are added etc.
  useLayoutEffect(() => {
    const scrollableRoot = scrollableRootRef.current;
    const lastScrollDistanceToRight = lastScrollDistanceToRightRef.current ?? 0;
    if (scrollableRoot) {
      scrollableRoot.scrollLeft =
        scrollableRoot.scrollWidth - lastScrollDistanceToRight;
    }
  }, [reversedItems, rootRef]);

  const rootRefSetter = useCallback(
    (node: HTMLDivElement) => {
      rootRef(node);
      scrollableRootRef.current = node;
    },
    [rootRef],
  );

  const handleRootScroll = useCallback(() => {
    const rootNode = scrollableRootRef.current;
    if (rootNode) {
      const scrollDistanceToRight = rootNode.scrollWidth - rootNode.scrollLeft;
      lastScrollDistanceToRightRef.current = scrollDistanceToRight;
    }
  }, []);

  return (
    <div
      ref={rootRefSetter}
      className="max-w-[600px] overflow-auto bg-slate-100"
      onScroll={handleRootScroll}
    >
      <List direction="horizontal">
        {hasNextPage && (
          <ListItem ref={infiniteRef}>
            <Loading />
          </ListItem>
        )}
        {reversedItems.map((item) => (
          <ListItem key={item.key}>{item.value}</ListItem>
        ))}
      </List>
    </div>
  );
}
