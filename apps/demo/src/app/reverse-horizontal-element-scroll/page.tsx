'use client';

import { useCallback, useLayoutEffect, useMemo, useRef } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { List, ListItem, Loading } from '../../components/list';
import { PageTitle } from '../../components/page-title';
import { useLoadItems } from '../../lib/utils';

export default function ReverseHorizontalElementScrollPage() {
  const { loading, items, hasNextPage, error, loadMore } = useLoadItems();

  const [infiniteRef, { rootRef }] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: Boolean(error),
  });

  const scrollableRootRef = useRef<React.ComponentRef<'div'> | null>(null);
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
    <main>
      <PageTitle filePath="apps/demo/src/app/reverse-horizontal-element-scroll/page.tsx">
        Reverse Horizontal Element Scroll
      </PageTitle>
      <div
        ref={rootRefSetter}
        className="flex max-w-[600px] overflow-auto bg-slate-100"
        onScroll={handleRootScroll}
      >
        {hasNextPage && <Loading ref={infiniteRef} />}
        <List direction="horizontal">
          {reversedItems.map((item) => (
            <ListItem key={item.key}>{item.value}</ListItem>
          ))}
        </List>
      </div>
    </main>
  );
}
