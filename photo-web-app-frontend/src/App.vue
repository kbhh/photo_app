<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <router-link to="/" class="flex-shrink-0 flex items-center">
              Photo Web App
            </router-link>
          </div>
          <div class="flex items-center">
            <template v-if="userStore.isAuthenticated">
              <router-link
                v-if="userStore.isAdmin"
                to="/admin"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >Admin</router-link
              >
              <button
                @click="logout"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </template>
            <router-link
              v-else
              to="/login"
              class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >Login</router-link
            >
          </div>
        </div>
      </div>
    </nav>

    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "./stores/user";

const userStore = useUserStore();
const router = useRouter();

onMounted(async () => {
  if (userStore.token) {
    await userStore.fetchUser();
  }
});

const logout = () => {
  userStore.logout();
  router.push("/login");
};
</script>
