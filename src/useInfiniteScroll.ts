import { useEffect } from 'react';
import {
  useTrackVisibility,
  IntersectionObserverHookArgs,
  IntersectionObserverHookRefCallback,
  IntersectionObserverHookRootRefCallback,
} from 'react-intersection-observer-hook';

const DEFAULT_DELAY_IN_MS = 100;

export type UseInfiniteScrollHookResult = [
  IntersectionObserverHookRefCallback,
  { rootRef: IntersectionObserverHookRootRefCallback },
];

export type UseInfiniteScrollHookArgs = Pick<
  IntersectionObserverHookArgs,
  // We pass this to 'IntersectionObserver'. We can use it to configure when to trigger 'onLoadMore'.
  'rootMargin'
> & {
  // Some sort of "is fetching" info of the request.
  loading: boolean;
  // If the list has more items to load.
  hasNextPage: boolean;
  // The callback function to execute when the 'onLoadMore' is triggered.
  // eslint-disable-next-line no-undef
  onLoadMore: VoidFunction;
  // Flag to stop infinite scrolling. Can be used in case of an error etc too.
  disabled?: boolean;
  // How long it should wait before triggering 'onLoadMore'.
  delayInMs?: number;
};

function useInfiniteScroll({
  loading,
  hasNextPage,
  onLoadMore,
  rootMargin,
  disabled,
  delayInMs = DEFAULT_DELAY_IN_MS,
}: UseInfiniteScrollHookArgs): UseInfiniteScrollHookResult {
  const [ref, { rootRef, isVisible }] = useTrackVisibility({
    rootMargin,
  });

  const shouldLoadMore = !disabled && !loading && isVisible && hasNextPage;

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (shouldLoadMore) {
      // When we trigger 'onLoadMore' and new items are added to the list,
      // right before they become rendered on the screen, 'loading' becomes false
      // and 'isVisible' can be true for a brief time, based on the scroll position.
      // So, it triggers 'onLoadMore' just after the first one is finished.
      // We use a small delay here to prevent this kind of situations.
      // It can be configured by hook args.
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
