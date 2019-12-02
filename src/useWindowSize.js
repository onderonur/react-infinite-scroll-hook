import { useState, useEffect, useCallback } from 'react';

function useWindowSize() {
  const validWindow = typeof window === 'object';

  const getSize = useCallback(() => {
    const size = {
      width: validWindow ? window.innerWidth : undefined,
      height: validWindow ? window.innerHeight : undefined
    };

    return size;
  }, [validWindow]);

  const [size, setSize] = useState(getSize());

  useEffect(() => {
    function handleResize() {
      setSize(getSize());
    }

    if (validWindow) {
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [getSize, validWindow]);

  return size;
}

export default useWindowSize;
