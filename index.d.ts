declare module "react-infinite-scroll-hook" {
  type VoidFunction = () => void;

  export function useWindowSize(): { width: number; height: number };

  interface useInfiniteScrollProp {
    loading: boolean;
    hasNextPage: boolean;
    loadMore: VoidFunction;
    threshold: number;
    checkInterval: number;
    scrollContainer: "window" | "parent";
  }

  export function useInfiniteScroll(): React.MutableRefObject<undefined>;

  export function useInterval(callback: Function, delay: number): void;
}
