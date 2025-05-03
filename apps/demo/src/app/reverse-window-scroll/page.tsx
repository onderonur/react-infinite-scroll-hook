'use client';

import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { List, ListItem, Loading } from '../../components/list';
import { PageTitle } from '../../components/page-title';
import { useLoadItems } from '../../lib/utils';

export default function ReverseWindowScrollPage() {
  const { loading, items, hasNextPage, error, loadMore } = useLoadItems();

  const [infiniteRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: Boolean(error),
  });

  const lastScrollDistanceToBottomRef = useRef<number>(0);

  const reversedItems = useMemo(() => [...items].reverse(), [items]);

  // We keep the scroll position when new items are added etc.
  useLayoutEffect(() => {
    const lastScrollDistanceToBottom = lastScrollDistanceToBottomRef.current;

    document.documentElement.scrollTop =
      document.body.scrollHeight - lastScrollDistanceToBottom;
  }, [reversedItems]);

  useEffect(() => {
    function handleScroll() {
      const rootNode = document.documentElement;
      const scrollDistanceToBottom = rootNode.scrollHeight - rootNode.scrollTop;
      lastScrollDistanceToBottomRef.current = scrollDistanceToBottom;
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main>
      {hasNextPage && <Loading ref={infiniteRef} />}
      <List>
        {reversedItems.map((item) => (
          <ListItem key={item.key}>{item.value}</ListItem>
        ))}
      </List>
      <PageTitle filePath="apps/demo/src/app/reverse-window-scroll/page.tsx">
        Reverse Window Scroll
      </PageTitle>
    </main>
  );
}
