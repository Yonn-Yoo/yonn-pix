import debounce from 'lodash.debounce';
import { useEffect, useMemo, useState } from 'react';

export default function useScroll() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  const debouncedHandleScroll = useMemo(() => debounce(handleScroll, 100), []);

  useEffect(() => {
    window.addEventListener('scroll', debouncedHandleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
    };
  }, []);

  return scrollPosition;
}
