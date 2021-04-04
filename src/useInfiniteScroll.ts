import { useEffect } from 'react';
import {
  IntersectionObserverHookRefCallback,
  useTrackVisibility,
} from 'react-intersection-observer-hook';

const DEFAULT_DELAY_IN_MS = 100;

export interface UseInfiniteScrollArgs {
  // Some sort of "is fetching" info of the request.
  loading: boolean;
  // If the list has more items to load.
  hasNextPage: boolean;
  // The callback function to execute when the infinite loading is triggered.
  onLoadMore: Function;
  // TODO: Açıklamalar
  rootMargin?: string;
  // Flag to stop infinite scrolling. Can be used in case of an error etc too.
  disabled?: boolean;
  // TODO: Açıklamalar
  delayInMs?: number;
}

// TODO: Bi sebepten çift çalışıo sanırım her run. Bi hem eski versiyondan hem de bundan kontrol et.
// En olmadı throttle, debouncer vs olabilir belki.

function useInfiniteScroll({
  loading,
  hasNextPage,
  onLoadMore,
  rootMargin,
  disabled,
  delayInMs = DEFAULT_DELAY_IN_MS,
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
      }, delayInMs);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [onLoadMore, shouldLoadMore, delayInMs]);

  return [ref, { rootRef }];
}

export default useInfiniteScroll;
