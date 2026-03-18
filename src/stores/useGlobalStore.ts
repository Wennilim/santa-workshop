import { create } from "zustand";

export type TWishlist = {
  id: number;
  wish: string;
  link: string;
};

type TRecipient = {
  id: number;
  recipient_name: string;
  gender: string;
  department: string;
  wishlist: Array<TWishlist> | null;
};

interface GlobalStore {
  winner: TRecipient | null;
  setWinner: (winner: TRecipient | null) => void;
  isClickLogin: boolean;
  setIsClickLogin: (isClickLogin: boolean) => void;
  isAuthError: boolean;
  setIsAuthError: (isAuthError: boolean) => void;
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  winner: null,
  setWinner: (winner: TRecipient | null) => set({ winner }),
  isClickLogin: false,
  setIsClickLogin: (isClickLogin: boolean) => set({ isClickLogin }),
  isAuthError: false,
  setIsAuthError: (isAuthError: boolean) => set({ isAuthError }),
}));
