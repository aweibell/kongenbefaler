import { useEffect } from 'react';
export const useKeyDown = (keys, callback) => {
  const onKeyDown = (event) => {
    const wasAnyKeyPressed = Array.isArray(keys) ? keys.some((key) => event.key === key) : keys === event.key;
    if (wasAnyKeyPressed) {
      event.preventDefault();
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);
};

// Example usage:
/*
 useKeyDown(["Escape"], () => {
   someCallback();
 });
*/