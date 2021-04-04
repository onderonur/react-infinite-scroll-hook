import * as React from 'react';
import styled from 'styled-components';
import useInfiniteScroll from '../../src';
import { useLoadItems } from '../utils';
import { List, ListItem, Loading } from '../components/List';

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
    disabled: !!error,
    rootMargin: '0px 0px 0px 400px',
  });

  const scrollableRootRef = React.useRef<HTMLDivElement | null>(null);
  const lastScrollDistanceToRightRef = React.useRef<number>();

  const reversedItems = React.useMemo(() => [...items].reverse(), [items]);

  // We keep the scroll position when new items are added etc.
  React.useEffect(() => {
    const scrollableRoot = scrollableRootRef.current;
    const lastScrollDistanceToRight = lastScrollDistanceToRightRef.current ?? 0;
    if (scrollableRoot) {
      scrollableRoot.scrollLeft =
        scrollableRoot.scrollWidth - lastScrollDistanceToRight;
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
      const scrollDistanceToRight = rootNode.scrollWidth - rootNode.scrollLeft;
      lastScrollDistanceToRightRef.current = scrollDistanceToRight;
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
