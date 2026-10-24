'use client';

import { useSyncExternalStore } from 'react';

/**
 * Tiny shared state for "is anything covering the page right now?".
 *
 * The preloader and the route-transition curtain both hide the page while it
 * mounts. Entrance animations wait on `useStageReady()` so they play once
 * there is somebody to watch them, instead of finishing behind a curtain.
 */

export const INTRO_KEY = 'vrazeal:intro';

type Stage = { introDone: boolean; covered: boolean };

let state: Stage = { introDone: false, covered: false };
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

export const stage = {
  get: () => state,
  setIntroDone() {
    if (state.introDone) return;
    state = { ...state, introDone: true };
    emit();
  },
  setCovered(covered: boolean) {
    if (state.covered === covered) return;
    state = { ...state, covered };
    emit();
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};

const serverSnapshot: Stage = { introDone: false, covered: false };

export function useStage() {
  return useSyncExternalStore(stage.subscribe, stage.get, () => serverSnapshot);
}

/** True once the page is visible: intro finished and no curtain in front. */
export function useStageReady() {
  const { introDone, covered } = useStage();
  return introDone && !covered;
}
