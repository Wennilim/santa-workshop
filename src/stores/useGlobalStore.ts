import { create } from "zustand";

interface GlobalStore {
  winner: string | null;
  setWinner: (winner: string | null) => void;
  isClickLogin: boolean;
  setIsClickLogin: (isClickLogin: boolean) => void;
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  winner: null,
  setWinner: (winner: string | null) => set({ winner }),
  isClickLogin: false,
  setIsClickLogin: (isClickLogin: boolean) => set({ isClickLogin }),
}));
