"use client";

import { createContext, useContext } from "react";

export interface AudioState {
  isPlaying: boolean;
  isLoading: boolean;
  volume: number;
  isMuted: boolean;
  error: string | null;
}

export interface AudioControls {
  togglePlay: () => void;
  toggleMute: () => void;
  setVolume: (v: number) => void;
  retry: () => void;
}

const defaultState: AudioState = {
  isPlaying: false,
  isLoading: false,
  volume: 0.8,
  isMuted: false,
  error: null,
};

const defaultControls: AudioControls = {
  togglePlay: () => {},
  toggleMute: () => {},
  setVolume: () => {},
  retry: () => {},
};

export const AudioStateContext = createContext<AudioState>(defaultState);
export const AudioControlsContext = createContext<AudioControls>(defaultControls);

export function useAudioState() {
  return useContext(AudioStateContext);
}

export function useAudioControls() {
  return useContext(AudioControlsContext);
}
