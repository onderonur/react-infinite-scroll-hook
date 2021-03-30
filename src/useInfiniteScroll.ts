import { useEffect, useState } from 'react';
import { useIntersectionObserver } from 'react-intersection-observer-hook';

export interface UseInfiniteScrollArgs {
  // Some sort of "fetching" info of the request.
  loading: boolean;
  // If the list has more items to load.
  hasNextPage: boolean;
  // The callback function to execute when the threshold is exceeded.
  onLoadMore: Function;
  // // Maximum distance to bottom of the window/parent to trigger the callback. Default is 150.
  // threshold?: number;
  // // Frequency to check the dom. Default is 200.
  // checkInterval?: number;
  // // May be `"window"` or `"parent"`. Default is `"window"`. If you want to use a scrollable parent for the infinite list, use `"parent"`.
  // scrollContainer?: InfiniteScrollContainer;
  rootMargin?: string;
}

function useInfiniteScroll({
  loading,
  hasNextPage,
  onLoadMore,
  rootMargin,
}: UseInfiniteScrollArgs) {
  const [ref, { entry }] = useIntersectionObserver({
    rootMargin,
  });
  const isIntersecting = entry?.isIntersecting;

  // Normally we could use the "loading" prop, but when you set "checkInterval" to a very small
  // number (like 10 etc.), some request components can't set its loading state
  // immediately (I had this problem with react-apollo's Query component. In some cases, it runs
  // "updateQuery" twice). Thus we set our own "listen" state which immeadiately turns to "false" on
  // calling "onLoadMore".
  const [listen, setListen] = useState(true);

  useEffect(() => {
    if (!loading) {
      setListen(true);
    }
  }, [loading]);

  useEffect(() => {
    console.log(listen, isIntersecting, hasNextPage);
    if (listen && isIntersecting && hasNextPage) {
      setListen(false);
      onLoadMore();
    }
  }, [listen, isIntersecting, hasNextPage, onLoadMore]);

  return ref;
}

export default useInfiniteScroll;
