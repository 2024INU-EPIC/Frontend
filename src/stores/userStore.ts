import { create } from "zustand";

interface UserState {
  name: string;
  level: string | null;
  setUserInfo: (name: string, level: string | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  name: "",
  level: "미정",
  setUserInfo: (name, level) =>
    set({
      name,
      level: level ?? "미정",
    }),
  clearUser: () => set({ name: "", level: "미정" }),
}));
