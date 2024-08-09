'use client';

import { useState } from 'react';
import { InfiniteListSimple } from '../components/infinite-list-simple';
import { InfiniteListWithHorizontalScroll } from '../components/infinite-list-with-horizontal-scroll';
import { InfiniteListWithReverseHozirontalScroll } from '../components/infinite-list-with-reverse-horizontal-scroll';
import { InfiniteListWithReverseVerticalScroll } from '../components/infinite-list-with-reverse-vertical-scroll';
import { InfiniteListWithVerticalScroll } from '../components/infinite-list-with-vertical-scroll';

enum InfiniteListType {
  SIMPLE,
  VERTICAL_SCROLL,
  HORIZONTAL_SCROLL,
  REVERSE_VERTICAL_SCROLL,
  REVERSE_HORIZONTAL_SCROLL,
}

export default function Page() {
  const [listType, setListType] = useState<InfiniteListType>(
    InfiniteListType.SIMPLE,
  );

  let InfiniteList;

  switch (listType) {
    case InfiniteListType.VERTICAL_SCROLL: {
      InfiniteList = InfiniteListWithVerticalScroll;
      break;
    }
    case InfiniteListType.HORIZONTAL_SCROLL: {
      InfiniteList = InfiniteListWithHorizontalScroll;
      break;
    }
    case InfiniteListType.REVERSE_VERTICAL_SCROLL: {
      InfiniteList = InfiniteListWithReverseVerticalScroll;
      break;
    }
    case InfiniteListType.REVERSE_HORIZONTAL_SCROLL: {
      InfiniteList = InfiniteListWithReverseHozirontalScroll;
      break;
    }
    default: {
      InfiniteList = InfiniteListSimple;
    }
  }

  return (
    <main className="flex flex-col gap-2 p-4">
      <h1 className="text-2xl font-black">Infinite List</h1>
      <p className="text-xl font-bold">
        Created by using “react-infinite-scroll-hook”
      </p>
      <label htmlFor="listType" className="font-semibold">
        List Type
        <select
          id="listType"
          className="ml-2 rounded border p-1"
          value={listType}
          onChange={(e) => {
            setListType(Number.parseInt(e.target.value));
          }}
        >
          <option value={InfiniteListType.SIMPLE}>Simple List</option>
          <option value={InfiniteListType.VERTICAL_SCROLL}>
            Vertically Scrollable List
          </option>
          <option value={InfiniteListType.HORIZONTAL_SCROLL}>
            Horizontally Scrollable List
          </option>
          <option value={InfiniteListType.REVERSE_VERTICAL_SCROLL}>
            Reversed Vertically Scrollable List
          </option>
          <option value={InfiniteListType.REVERSE_HORIZONTAL_SCROLL}>
            Reversed Horizontally Scrollable List
          </option>
        </select>
      </label>
      <InfiniteList />
    </main>
  );
}
