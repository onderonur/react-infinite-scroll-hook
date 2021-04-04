import * as React from 'react';
import styled from 'styled-components';
import useInfiniteScroll from '../../src';
import { useLoadItems } from '../utils';
import { List, ListItem, Loading } from './List';

const ListContainer = styled.div`
  max-width: 600px;
  overflow: auto;
  background-color: #fafafa;
`;

function InfiniteListWithReverseHozirontalScroll() {
  const { loading, items, hasNextPage, error, loadMore } = useLoadItems();

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
  const lastScrollDistanceToLeftRef = React.useRef<number>();

  const reversedItems = React.useMemo(() => [...items].reverse(), [items]);

  React.useEffect(() => {
    const scrollableRoot = scrollableRootRef.current;
    const lastScrollDistanceToLeft = lastScrollDistanceToLeftRef.current ?? 0;
    if (scrollableRoot) {
      scrollableRoot.scrollLeft =
        scrollableRoot.scrollWidth - lastScrollDistanceToLeft;
    }
  }, [reversedItems, rootRef]);

  const rootRefSetter = React.useCallback(
    (node: HTMLDivElement) => {
      rootRef(node);
      scrollableRootRef.current = node;
    },
    [rootRef],
  );

  const handleRootScroll = React.useCallback(() => {
    const rootNode = scrollableRootRef.current;
    if (rootNode) {
      lastScrollDistanceToLeftRef.current =
        rootNode.scrollWidth - rootNode.scrollLeft;
    }
  }, []);

  return (
    <>
      <ListContainer ref={rootRefSetter} onScroll={handleRootScroll}>
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
      </ListContainer>
    </>
  );
}

export default InfiniteListWithReverseHozirontalScroll;
