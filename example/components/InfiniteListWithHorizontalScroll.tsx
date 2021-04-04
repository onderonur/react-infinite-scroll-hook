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

function InfiniteListWithHorizontalScroll() {
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

  return (
    <>
      <ListContainer ref={rootRef}>
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
      </ListContainer>
    </>
  );
}

export default InfiniteListWithHorizontalScroll;
