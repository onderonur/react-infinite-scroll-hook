import { useEffect, useRef, useState } from "react";
import useWindowHeight from "./useWindowHeight";

function useInfiniteScroll({
  loading,
  hasNextPage,
  loadMore,
  threshold = 150,
  checkInterval = 200
}) {
  const ref = useRef();
  const intervalRef = useRef();
  const windowHeight = useWindowHeight();
  // Normally we could use the "loading" prop, but when you set "checkInterval" to a very small
  // number (like 10 etc.), some request components can't set its loading state
  // immediately (I had this problem with react-apollo's Query component. In some cases, it runs
  // "updateQuery" twice). Thus we set our own "listen" state which immeadiately turns to "false" on
  // calling "loadMore".
  const [listen, setListen] = useState(true);

  useEffect(() => {
    if (!loading) {
      setListen(true);
    }
  }, [loading]);

  useEffect(() => {
    function getBottomOffset() {
      const rect = ref.current.getBoundingClientRect();
      const bottom = rect.bottom;
      const bottomOffset = bottom - windowHeight;

      return bottomOffset;
    }

    function listenBottomOffset() {
      intervalRef.current = setInterval(() => {
        if (listen && !loading && hasNextPage) {
          if (ref.current) {
            // Get if the distance between bottom of the container and bottom of the window
            // is less than "threshold"
            const bottomOffset = getBottomOffset();
            const validOffset = bottomOffset < threshold;

            if (validOffset) {
              setListen(false);
              loadMore();
            }
          }
        }
      }, checkInterval);
    }

    listenBottomOffset();

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [
    threshold,
    checkInterval,
    hasNextPage,
    loading,
    windowHeight,
    loadMore,
    listen
  ]);

  return ref;
}

export default useInfiniteScroll;
