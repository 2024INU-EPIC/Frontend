import { create } from "zustand";

interface AuthState {
  userId: number;
  accessToken: string | null;
  setAuth: (userId: number, accessToken: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userId: Number(sessionStorage.getItem("userId"))|| 0,
  accessToken: sessionStorage.getItem("accessToken"),
  setAuth: (userId, accessToken) =>  
    set({ userId, accessToken }),
  clearAuth: () => set({ userId: 0, accessToken: ""}),
}));