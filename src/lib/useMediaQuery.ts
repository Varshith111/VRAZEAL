'use client';

import { useEffect, useState } from 'react';

/**
 * SSR-safe media query. Always reports `false` on the server and on the first
 * client render, then settles — so components that swap layouts should render
 * the mobile branch until this resolves.
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const list = window.matchMedia(query);
    setMatches(list.matches);
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    list.addEventListener('change', onChange);
    return () => list.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}
