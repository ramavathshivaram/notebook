import { create } from "zustand";
import {
  authCheckApi,
  loginApi,
  logoutApi,
  registerApi,
} from "@/helper/api.js";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isCheckingAuth: true,
  token: null,

  setUser: (user) => set({ user }),

  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),

  setToken: (token) => set({ token }),

  login: async (userData) => {
    try {
      const { user, token } = await loginApi(userData);

      set({
        user: user,
        isAuthenticated: true,
        token: token,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({ user: null, isAuthenticated: false, token: null });

      console.error(error);
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const { user, token } = await registerApi(userData);

      set({
        user: user,
        isAuthenticated: true,
        token: token,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({ user: null, isAuthenticated: false, token: null });
      throw error;
    }
  },

  logout: async () => {
    try {
      await logoutApi();
    } catch (error) {
      console.error(error);
    } finally {
      set({ user: null, isAuthenticated: false, token: null });
    }
  },

  authCheck: async () => {
    try {
      await authCheckApi();
      set({ isAuthenticated: true, isCheckingAuth: false });
    } catch (error) {
      console.error(error);
      set({ user: null, isAuthenticated: false, token: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  clearUser: () => set({ user: null, isAuthenticated: false, token: null }),
}));

export default useAuthStore;
