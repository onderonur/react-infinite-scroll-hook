import "./InfiniteList.css";
import React, { useState } from "react";
import { useInfiniteScroll } from "../../src";

const ARRAY_SIZE = 20;
const RESPONSE_TIME = 1000;

const loadItems = (prevArray = [], startCursor = 0) => {
  return new Promise(resolve => {
    setTimeout(() => {
      let newArray = prevArray;

      for (let i = startCursor; i < startCursor + ARRAY_SIZE; i++) {
        const newItem = {
          key: i,
          value: `This is item ${i}`
        };
        newArray = [...newArray, newItem];
      }

      resolve(newArray);
    }, RESPONSE_TIME);
  });
};

function InfiniteList() {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  function loadMore() {
    setLoading(true);
    loadItems(items, items.length).then(newArray => {
      setLoading(false);
      setItems(newArray);
    });
  }

  const infiniteRef = useInfiniteScroll({
    loading,
    // This value is set to "true" for this demo only. You will need to
    // get this value from the API when you request your items.
    hasNextPage: true,
    loadMore
  });

  return (
    <ul ref={infiniteRef} className="infinite-list">
      {items.map(item => (
        <li key={item.key} className="infinite-list-item">
          {item.value}
        </li>
      ))}
      {loading && <li>Loading...</li>}
    </ul>
  );
}

export default InfiniteList;
