import * as React from 'react';
import styled from 'styled-components';
import useInfiniteScroll from '../../src';
import { useLoadItems } from '../utils';
import { List, ListItem, Loading } from './List';

const ListContainer = styled.div`
  max-height: 500px;
  max-width: 500px;
  overflow: auto;
  background-color: #fafafa;
`;

function InfiniteListWithReverseVerticalScroll() {
  const { loading, items, hasNextPage, error, loadMore } = useLoadItems();
  const reversedItems = React.useMemo(() => [...items].reverse(), [items]);

  const [infiniteRef, { rootRef }] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    // When there is an error, we stop infinite loading.
    // It can be reactivated by setting "error" state as undefined.
    disabled: !!error,
    // TODO: rootMargin kullanımı
  });

  const scrollableRootRef = React.useRef<HTMLDivElement | null>(null);
  const lastScrollDistanceToBottomRef = React.useRef<number>();

  React.useEffect(() => {
    const scrollableRoot = scrollableRootRef.current;
    const lastScrollDistanceToBottom =
      lastScrollDistanceToBottomRef.current ?? 0;
    if (scrollableRoot) {
      scrollableRoot.scrollTop =
        scrollableRoot.scrollHeight - lastScrollDistanceToBottom;
    }
  }, [reversedItems, rootRef]);

  const refSetter = React.useCallback(
    (node: HTMLDivElement) => {
      rootRef(node);
      scrollableRootRef.current = node;
    },
    [rootRef],
  );

  const handleRootScroll = React.useCallback(() => {
    const rootNode = scrollableRootRef.current;
    if (rootNode) {
      lastScrollDistanceToBottomRef.current =
        rootNode.scrollHeight - rootNode.scrollTop;
    }
  }, []);

  return (
    <>
      <ListContainer ref={refSetter} onScroll={handleRootScroll}>
        <List>
          {/* 
              As long as we have a "next page", we show "Loading" right under the list.
              When it becomes visible on the screen, or it becomes near, it triggers infinite loading.
              This is our "sentry".
              We can also use another "sentry" which is separated from the "Loading" component like:
                <div ref={infiniteRef} />
                {loading && <ListItem>Loading...</ListItem>}
              and leave "Loading" without this ref.
          */}
          {hasNextPage && (
            <ListItem ref={infiniteRef}>
              <Loading />
            </ListItem>
          )}
          {reversedItems.map((item) => (
            <ListItem key={item.key}>{item.value}</ListItem>
          ))}
        </List>
      </ListContainer>
    </>
  );
}

export default InfiniteListWithReverseVerticalScroll;
