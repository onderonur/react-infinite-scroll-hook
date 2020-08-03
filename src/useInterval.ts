import { useRef, useEffect } from 'react';
import { Maybe } from './types';

function useInterval(callback: VoidFunction, delay: number) {
  const savedCallback = useRef<Maybe<VoidFunction>>(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current?.();
    }

    if (delay) {
      const id = setInterval(() => {
        tick();
      }, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [delay]);
}

export default useInterval;
