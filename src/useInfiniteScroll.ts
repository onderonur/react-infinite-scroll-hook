import { useEffect } from 'react';
import {
  IntersectionObserverHookRefCallback,
  useTrackVisibility,
} from 'react-intersection-observer-hook';

// TODO: Rename???
const WAIT_BEFORE_LOAD_IN_MS = 100;

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
  disabled?: boolean;
  // TODO: Rename??
  waitBeforeLoadInMs?: number;
}

// TODO: Bi sebepten çift çalışıo sanırım her run. Bi hem eski versiyondan hem de bundan kontrol et.
// En olmadı throttle, debouncer vs olabilir belki.

function useInfiniteScroll({
  loading,
  hasNextPage,
  onLoadMore,
  rootMargin,
  disabled,
  waitBeforeLoadInMs = WAIT_BEFORE_LOAD_IN_MS,
}: // TODO: Type
UseInfiniteScrollArgs): [IntersectionObserverHookRefCallback, any] {
  const [ref, { rootRef, isVisible }] = useTrackVisibility({
    rootMargin,
  });

  const shouldLoadMore = !disabled && !loading && isVisible && hasNextPage;

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (shouldLoadMore) {
      // TODO: Buraya açıklama lazım.
      const timer = setTimeout(() => {
        onLoadMore();
      }, waitBeforeLoadInMs);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [onLoadMore, shouldLoadMore, waitBeforeLoadInMs]);

  return [ref, { rootRef }];
}

export default useInfiniteScroll;
