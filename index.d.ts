declare module "react-infinite-scroll-hook" {
  type VoidFunction = () => void;

  export function useWindowHeight(): number;

  interface useInfiniteScrollProp {
    loading: boolean;
    hasNextPage: boolean;
    loadMore: VoidFunction;
    threshold: number;
    checkInterval: number;
  }
  export function useInfiniteScroll(): React.MutableRefObject<undefined>;
}
