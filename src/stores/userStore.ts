import { create } from "zustand";

interface UserState {
  name: string;
  level: string | null;
  setUserInfo: (name: string, level: string | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  name: sessionStorage.getItem("name") || "",
  level: sessionStorage.getItem("level") || "미정",
  setUserInfo: (name, level) => {
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("level", level ?? "미정");
    set({ name, level: level ?? "미정" });
  },
  clearUser: () => {
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("level");
    set({ name: "", level: "미정" });
  },
}));
