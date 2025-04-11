'use client';

import useInfiniteScroll from 'react-infinite-scroll-hook';
import { List, ListItem, Loading } from '../../components/list';
import { PageTitle } from '../../components/page-title';
import { useLoadItems } from '../../lib/utils';

export default function VerticalElementScrollPage() {
  const { loading, items, hasNextPage, error, loadMore } = useLoadItems();

  const [infiniteRef, { rootRef }] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: Boolean(error),
    rootMargin: '0px 0px 400px 0px',
  });

  return (
    <main>
      <PageTitle filePath="apps/demo/src/app/vertical-element-scroll/page.tsx">
        Vertical Element Scroll
      </PageTitle>
      <div
        ref={rootRef}
        className="max-h-[500px] max-w-[500px] overflow-auto bg-slate-100"
      >
        <List>
          {items.map((item) => (
            <ListItem key={item.key}>{item.value}</ListItem>
          ))}
        </List>
        {hasNextPage && <Loading ref={infiniteRef} />}
      </div>
    </main>
  );
}
