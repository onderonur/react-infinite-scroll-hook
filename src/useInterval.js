import { useRef, useEffect } from 'react';

function useInterval(callback, delay) {
  const savedCallback = useRef(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay) {
      const id = setInterval(() => {
        tick();
      }, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval;
