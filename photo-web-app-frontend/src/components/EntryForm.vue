<template>
  <form
    @submit.prevent="submitEntry"
    class="space-y-6 bg-white p-8 rounded-lg shadow-md"
  >
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700"
        >Name</label
      >
      <input
        v-model="name"
        type="text"
        id="name"
        required
        class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
    <div>
      <label for="image" class="block text-sm font-medium text-gray-700"
        >Image</label
      >
      <input
        type="file"
        id="image"
        @change="handleFileUpload"
        accept="image/*"
        class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
    <button
      type="submit"
      class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
    >
      Submit Entry
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import api from "@/utils/api";

const name = ref("");
const image = ref<File | null>(null);

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    image.value = target.files[0];
  }
};

const submitEntry = async () => {
  try {
    const formData = new FormData();
    formData.append("name", name.value);
    if (image.value) {
      formData.append("image", image.value);
    }

    await api.post("/entries", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    name.value = "";
    image.value = null;
    // Emit event to parent to refresh entries
    emit("entry-added");
  } catch (error) {
    console.error("Failed to submit entry:", error);
    // Handle error (e.g., show error message)
  }
};

const emit = defineEmits(["entry-added"]);
</script>
