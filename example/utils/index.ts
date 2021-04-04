import * as React from 'react';

const ARRAY_SIZE = 20;
const RESPONSE_TIME_IN_MS = 1000;

export interface Item {
  key: number;
  value: string;
}

interface Response {
  hasNextPage: boolean;
  data: Item[];
}

function loadItems(startCursor = 0): Promise<Response> {
  return new Promise((resolve) => {
    let newArray: Item[] = [];

    setTimeout(() => {
      for (let i = startCursor; i < startCursor + ARRAY_SIZE; i++) {
        const newItem = {
          key: i,
          value: `This is item ${i}`,
        };
        newArray = [...newArray, newItem];
      }

      resolve({ hasNextPage: true, data: newArray });
    }, RESPONSE_TIME_IN_MS);
  });
}

export function useLoadItems() {
  const [loading, setLoading] = React.useState(false);
  const [items, setItems] = React.useState<Item[]>([]);
  const [hasNextPage, setHasNextPage] = React.useState<boolean>(true);
  const [error, setError] = React.useState<Error>();

  async function loadMore() {
    setLoading(true);
    try {
      const { data, hasNextPage: newHasNextPage } = await loadItems(
        items.length,
      );
      setItems((current) => [...current, ...data]);
      setHasNextPage(newHasNextPage);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return { loading, items, hasNextPage, error, loadMore };
}
