'use client';

import { useEffect, useState } from 'react';

export const INTRO_EVENT = 'vrazeal:intro-complete';
export const INTRO_KEY = 'vrazeal:intro';

/**
 * True once the intro curtain has started lifting — or immediately, if the
 * visitor has already seen it this session or asked for reduced motion.
 * Lets the hero hold its entrance until there is somebody to watch it.
 */
export function useIntroReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || sessionStorage.getItem(INTRO_KEY) === 'seen') {
      setReady(true);
      return;
    }
    const onDone = () => setReady(true);
    window.addEventListener(INTRO_EVENT, onDone);
    // Safety net: never let a failed intro strand the hero in its hidden state.
    const timeout = window.setTimeout(() => setReady(true), 3600);
    return () => {
      window.removeEventListener(INTRO_EVENT, onDone);
      window.clearTimeout(timeout);
    };
  }, []);

  return ready;
}
