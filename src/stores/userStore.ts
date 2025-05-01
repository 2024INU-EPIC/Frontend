import { create } from "zustand";

interface UserState {
  name: string;
  level: string;
  setUserInfo: (name: string, level: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  name: "",
  level: "",
  setUserInfo: (name, level) => set({ name, level }),
}));
