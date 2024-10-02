import { defineStore } from "pinia";
import api from "@/utils/api";

interface User {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canViewAll: boolean;
}

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as User | null,
    token: localStorage.getItem("token"),
  }),

  getters: {
    isAuthenticated(): boolean {
      return !!this.token;
    },
    isAdmin(): boolean {
      return this.user?.isAdmin || false;
    },
  },

  actions: {
    setUser(user: User) {
      this.user = user;
    },

    setToken(token: string) {
      this.token = token;
      localStorage.setItem("token", token);
    },
    async register(
      name: string,
      email: string,
      password: string,
      adminToken?: string
    ) {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
        adminToken,
      });
      this.setUser(response.data.user);
      this.setToken(response.data.token);
    },
    async login(email: string, password: string) {
      const response = await api.post("/auth/login", { email, password });
      this.setUser(response.data.user);
      this.setToken(response.data.token);
    },
    async fetchUser() {
      try {
        const response = await api.get("/auth/me");
        this.setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        this.logout();
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");
    },
  },
});
