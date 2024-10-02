<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
    id="my-modal"
  >
    <div
      class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
    >
      <div class="mt-3 text-center">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Edit Entry</h3>
        <form @submit.prevent="saveEntry" class="mt-2 text-left">
          <div class="mb-4">
            <label for="name" class="block text-gray-700 text-sm font-bold mb-2"
              >Name:</label
            >
            <input
              v-model="editedEntry.name"
              id="name"
              type="text"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div class="mb-4">
            <label
              for="image"
              class="block text-gray-700 text-sm font-bold mb-2"
              >New Image:</label
            >
            <input
              type="file"
              id="image"
              @change="handleFileUpload"
              accept="image/*"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div class="flex items-center justify-between">
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save Changes
            </button>
            <button
              @click="closeModal"
              type="button"
              class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import api from "@/utils/api";

const props = defineProps<{
  isOpen: boolean;
  entry: any;
}>();

const emit = defineEmits(["close", "update"]);

const editedEntry = ref({ ...props.entry });
const newImage = ref<File | null>(null);

watch(
  () => props.entry,
  (newEntry) => {
    editedEntry.value = { ...newEntry };
  }
);

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    newImage.value = target.files[0];
  }
};

const saveEntry = async () => {
  try {
    const formData = new FormData();
    formData.append("name", editedEntry.value.name);
    if (newImage.value) {
      formData.append("image", newImage.value);
    }

    await api.put(`/entries/${editedEntry.value.id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    emit("update");
    closeModal();
  } catch (error) {
    console.error("Failed to update entry:", error);
  }
};

const closeModal = () => {
  emit("close");
};
</script>
