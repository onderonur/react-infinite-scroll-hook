import * as React from 'react';
import useInfiniteScroll, {
  InfiniteScrollMode,
  UseInfiniteScrollArgs,
} from '../src';
import styled from 'styled-components';

interface Item {
  key: number;
  value: string;
}

const List = styled.ul`
  list-style: none;
  font-size: 16px;
  margin: 0;
  padding: 6px;
`;

const ListItem = styled.li`
  background-color: #fafafa;
  border: 1px solid #99b4c0;
  padding: 8px;
  margin: 4px;
`;

const ARRAY_SIZE = 3;
const RESPONSE_TIME = 1000;

function loadItems(prevArray: Item[] = [], startCursor = 0): Promise<Item[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      let newArray = prevArray;

      for (let i = startCursor; i < startCursor + ARRAY_SIZE; i++) {
        const newItem = {
          key: i,
          value: `This is item ${i}`,
        };
        newArray = [...newArray, newItem];
      }

      resolve(newArray);
    }, RESPONSE_TIME);
  });
}

function InfiniteList({
  scrollContainer,
  mode = InfiniteScrollMode.INTERVAL,
}: Partial<UseInfiniteScrollArgs>) {
  const [loading, setLoading] = React.useState(false);
  const [items, setItems] = React.useState<Item[]>([]);

  function handleLoadMore() {
    setLoading(true);
    loadItems(items, items.length).then((newArray) => {
      setLoading(false);
      setItems(newArray);
    });
  }

  // React.useEffect(() => {
  //   if (mode === InfiniteScrollMode.SCROLL_EVENT) {
  //     handleLoadMore();
  //   }
  // }, [mode]);

  const infiniteRef = useInfiniteScroll<HTMLUListElement>({
    loading,
    // This value is set to "true" for this demo only. You will need to
    // get this value from the API when you request your items.
    hasNextPage: true,
    onLoadMore: handleLoadMore,
    scrollContainer,
    mode,
  });

  return (
    <List ref={infiniteRef}>
      {items.map((item) => (
        <ListItem key={item.key}>{item.value}</ListItem>
      ))}
      {loading && <ListItem>Loading...</ListItem>}
    </List>
  );
}

export default InfiniteList;
