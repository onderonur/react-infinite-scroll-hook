import { useCallback, useLayoutEffect, useMemo, useRef } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { useLoadItems } from '../utils';
import { List, ListItem, Loading } from './list';

export function InfiniteListWithReverseVerticalScroll() {
  const { loading, items, hasNextPage, error, loadMore } = useLoadItems();

  const [infiniteRef, { rootRef }] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: Boolean(error),
    rootMargin: '400px 0px 0px 0px',
  });

  const scrollableRootRef = useRef<React.ComponentRef<'div'> | null>(null);
  const lastScrollDistanceToBottomRef = useRef<number>();

  const reversedItems = useMemo(() => [...items].reverse(), [items]);

  // We keep the scroll position when new items are added etc.
  useLayoutEffect(() => {
    const scrollableRoot = scrollableRootRef.current;
    const lastScrollDistanceToBottom =
      lastScrollDistanceToBottomRef.current ?? 0;
    if (scrollableRoot) {
      scrollableRoot.scrollTop =
        scrollableRoot.scrollHeight - lastScrollDistanceToBottom;
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
      const scrollDistanceToBottom = rootNode.scrollHeight - rootNode.scrollTop;
      lastScrollDistanceToBottomRef.current = scrollDistanceToBottom;
    }
  }, []);

  return (
    <div
      ref={rootRefSetter}
      className="max-h-[500px] max-w-[500px] overflow-auto bg-slate-100"
      onScroll={handleRootScroll}
    >
      <List>
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
