import { create } from "zustand";

interface GlobalStore {
  winner: string | null;
  setWinner: (winner: string | null) => void;
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  winner: null,
  setWinner: (winner: string | null) => set({ winner }),
}));
