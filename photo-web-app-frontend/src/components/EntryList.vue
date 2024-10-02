<template>
  <div class="space-y-6">
    <div
      v-for="entry in entries"
      :key="entry.id"
      class="bg-white shadow-md rounded-lg overflow-hidden"
    >
      <div class="px-6 py-4">
        <h3 class="text-lg font-semibold text-gray-900">{{ entry.name }}</h3>
        <p class="text-sm text-gray-500">
          {{ new Date(entry.createdAt).toLocaleString() }}
        </p>
      </div>
      <img
        :src="getImageUrl(entry.imagePath)"
        :alt="entry.name"
        class="w-full h-64 object-cover"
        @error="handleImageError"
      />
      <div class="px-6 py-4 bg-gray-50 flex justify-end space-x-2">
        <button
          v-if="canEdit"
          @click="openEditModal(entry)"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
        >
          Edit
        </button>
        <button
          v-if="canDelete"
          @click="deleteEntry(entry.id)"
          class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
        >
          Delete
        </button>
      </div>
    </div>
    <EditEntryModal
      :is-open="isEditModalOpen"
      :entry="selectedEntry"
      @close="closeEditModal"
      @update="handleEntryUpdate"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import api from "@/utils/api";
import { useUserStore } from "@/stores/user";
import EditEntryModal from "./EditEntryModal.vue";

const userStore = useUserStore();
const entries = ref([]);
const canEdit = computed(() => userStore.user?.canEdit || false);
const canDelete = computed(() => userStore.user?.canDelete || false);

const isEditModalOpen = ref(false);
const selectedEntry = ref(null);

const getImageUrl = (imagePath: string) => {
  return `http://localhost:3000${imagePath}`;
};

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src = "/path/to/fallback/image.jpg"; // Replace with a path to a default image
};

const fetchEntries = async () => {
  try {
    const endpoint = userStore.isAdmin ? '/admin/entries' : '/entries';
    const response = await api.get(endpoint);
    entries.value = response.data;
  } catch (error) {
    console.error('Failed to fetch entries:', error);
  }
};

const openEditModal = (entry) => {
  selectedEntry.value = entry;
  isEditModalOpen.value = true;
};

const closeEditModal = () => {
  isEditModalOpen.value = false;
  selectedEntry.value = null;
};

const handleEntryUpdate = () => {
  fetchEntries();
};

const deleteEntry = async (id) => {
  try {
    await api.delete(`/entries/${id}`);
    await fetchEntries();
  } catch (error) {
    console.error("Failed to delete entry:", error);
  }
};

onMounted(fetchEntries);

defineExpose({ fetchEntries });
</script>
