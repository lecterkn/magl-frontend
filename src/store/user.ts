import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  user: UserModel | null;
  setUser: (user: UserModel | null) => void;
}

interface AuthState {
  auth: AuthModel | null;
  setAuth: (auth: AuthModel | null) => void;
}

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: "user-storage",
    },
  ),
);

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      auth: null,
      setAuth: (auth) => set({ auth }),
    }),
    {
      name: "auth-storage",
    },
  ),
);
