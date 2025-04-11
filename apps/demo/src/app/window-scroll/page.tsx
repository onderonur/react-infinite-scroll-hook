'use client';

import useInfiniteScroll from 'react-infinite-scroll-hook';
import { List, ListItem, Loading } from '../../components/list';
import { PageTitle } from '../../components/page-title';
import { useLoadItems } from '../../lib/utils';

export default function WindowScrollPage() {
  const { loading, items, hasNextPage, error, loadMore } = useLoadItems();

  const [infiniteRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    // When there is an error, we stop infinite loading.
    // It can be reactivated by setting "error" state as undefined.
    disabled: Boolean(error),
    // `rootMargin` is passed to `IntersectionObserver`.
    // We can use it to trigger 'onLoadMore' when the sentry comes near to become
    // visible, instead of becoming fully visible on the screen.
    rootMargin: '0px 0px 400px 0px',
  });

  return (
    <>
      <main>
        <PageTitle filePath="apps/demo/src/app/window-scroll/page.tsx">
          Window Scroll
        </PageTitle>
        <List>
          {items.map((item) => (
            <ListItem key={item.key}>{item.value}</ListItem>
          ))}
        </List>
        {hasNextPage && <Loading ref={infiniteRef} />}
      </main>
      {/* This is just for demonstration purposes.
      It may not be a good idea to put content below a full page infinite scroll list. */}
      <footer className="h-[600px] bg-slate-300 p-4">Footer</footer>
    </>
  );
}
