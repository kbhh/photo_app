<template>
  <form
    @submit.prevent="login"
    class="space-y-6 bg-white p-8 rounded-lg shadow-md"
  >
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700"
        >Email</label
      >
      <input
        v-model="email"
        type="email"
        id="email"
        required
        class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
    <div>
      <label for="password" class="block text-sm font-medium text-gray-700"
        >Password</label
      >
      <input
        v-model="password"
        type="password"
        id="password"
        required
        class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
    <button
      type="submit"
      class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
    >
      Sign In
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

const email = ref("");
const password = ref("");
const router = useRouter();
const userStore = useUserStore();

const login = async () => {
  try {
    await userStore.login(email.value, password.value);
    router.push("/");
  } catch (error) {
    console.error("Login failed:", error);
    // Handle login error (e.g., show error message)
  }
};
</script>
