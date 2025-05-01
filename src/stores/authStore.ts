import { create } from "zustand";

interface AuthState {
  userId: string;
  accessToken: string;
  //refreshToken: string;
  //setAuth: (userId: string, accessToken: string, refreshToken: string) => void;
  setAuth: (userId: string, accessToken: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userId: "",
  accessToken: "",
  //refreshToken: "",
  //setAuth: (userId, accessToken, refreshToken) =>
  setAuth: (userId, accessToken) =>  
    set({ userId, accessToken }),
    //set({ userId, accessToken, refreshToken }),
  //clearAuth: () => set({ userId: "", accessToken: "", refreshToken: "" }),
  clearAuth: () => set({ userId: "", accessToken: ""}),
}));