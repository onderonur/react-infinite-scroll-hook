import * as React from 'react';
import styled from 'styled-components';
import useInfiniteScroll from '../../src';
import { useLoadItems } from '../utils';
import { List, ListItem, Loading } from './List';

const ListContainer = styled.div`
  background-color: #fafafa;
`;

const Footer = styled.div`
  height: 600px;
  background-color: #dcdcdc;
`;

function SimpleInfiniteList() {
  const { loading, items, hasNextPage, error, loadMore } = useLoadItems();

  const [infiniteRef] = useInfiniteScroll({
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
      <ListContainer>
        <List>
          {items.map((item) => (
            <ListItem key={item.key}>{item.value}</ListItem>
          ))}
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
        </List>
      </ListContainer>
      <Footer>Footer</Footer>
    </>
  );
}

export default SimpleInfiniteList;
