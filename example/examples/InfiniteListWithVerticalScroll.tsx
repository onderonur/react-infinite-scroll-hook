import * as React from 'react';
import styled from 'styled-components';
import useInfiniteScroll from '../../src';
import { useLoadItems } from '../utils';
import { List, ListItem, Loading } from '../components/List';

const ListContainer = styled.div`
  max-height: 500px;
  max-width: 500px;
  overflow: auto;
  background-color: #fafafa;
`;

function InfiniteListWithVerticalScroll() {
  const { loading, items, hasNextPage, error, loadMore } = useLoadItems();

  const [infiniteRef, { rootRef }] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    // When there is an error, we stop infinite loading.
    // It can be reactivated by setting "error" state as undefined.
    disabled: !!error,
    rootMargin: '0px 0px 400px 0px',
  });

  return (
    <>
      <ListContainer ref={rootRef}>
        <List>
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

export default InfiniteListWithVerticalScroll;
