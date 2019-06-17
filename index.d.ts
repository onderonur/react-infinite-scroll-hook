declare module "react-infinite-scroll-hook" {
  export interface useInfiniteScrollProps {
    // Some sort of "fetching" info of the request.
    loading: boolean;
    // If the list has more items to load.
    hasNextPage: boolean;
    // The callback function to execute when the threshold is exceeded.
    onLoadMore: Function;
    // Maximum distance to bottom of the window/parent to trigger the callback. Default is 150.
    threshold?: number;
    // Frequency to check the dom. Default is 200.
    checkInterval?: number;
    // May be `"window"` or `"parent"`. Default is `"window"`. If you want to use a scrollable parent for the infinite list, use `"parent"`.
    scrollContainer?: "window" | "parent";
  }
  export function useInfiniteScroll(
    props: useInfiniteScrollProps
  ): React.MutableRefObject<undefined>;
}
