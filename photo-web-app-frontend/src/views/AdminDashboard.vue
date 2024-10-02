<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Admin Dashboard</h1>
    <div class="bg-white shadow-md rounded-lg p-6">
      <h2 class="text-xl font-semibold mb-4">User Management</h2>
      <div v-for="user in users" :key="user.id" class="mb-4 p-4 border rounded">
        <h3 class="font-medium">{{ user.name }} ({{ user.email }})</h3>
        <div class="mt-2">
          <label class="inline-flex items-center mr-4">
            <input type="checkbox" v-model="user.canEdit" @change="updateUserPermissions(user)" class="form-checkbox">
            <span class="ml-2">Can Edit</span>
          </label>
          <label class="inline-flex items-center mr-4">
            <input type="checkbox" v-model="user.canDelete" @change="updateUserPermissions(user)" class="form-checkbox">
            <span class="ml-2">Can Delete</span>
          </label>
          <label class="inline-flex items-center">
            <input type="checkbox" v-model="user.canViewAll" @change="updateUserPermissions(user)" class="form-checkbox">
            <span class="ml-2">Can View All</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '@/utils/api';

const users = ref([]);

const fetchUsers = async () => {
  try {
    const response = await api.get('/admin/users');
    users.value = response.data;
  } catch (error) {
    console.error('Failed to fetch users:', error);
  }
};

const updateUserPermissions = async (user) => {
  try {
    await api.put(`/admin/users/${user.id}/permissions`, {
      canEdit: user.canEdit,
      canDelete: user.canDelete,
      canViewAll: user.canViewAll
    });
  } catch (error) {
    console.error('Failed to update user permissions:', error);
  }
};

onMounted(fetchUsers);
</script>