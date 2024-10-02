<template>
  <div class="space-y-8">
    <div>
      <h2 class="text-2xl font-bold mb-4">User Management</h2>
      <div
        v-for="user in users"
        :key="user.id"
        class="bg-white shadow overflow-hidden sm:rounded-lg mb-4"
      >
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            {{ user.name }}
          </h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">{{ user.email }}</p>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl class="sm:divide-y sm:divide-gray-200">
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Can Edit</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <input
                  type="checkbox"
                  v-model="user.canEdit"
                  @change="updatePermissions(user)"
                />
              </dd>
            </div>
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Can Delete</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <input
                  type="checkbox"
                  v-model="user.canDelete"
                  @change="updatePermissions(user)"
                />
              </dd>
            </div>
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Can View All</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <input
                  type="checkbox"
                  v-model="user.canViewAll"
                  @change="updatePermissions(user)"
                />
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

const users = ref([]);

const fetchUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/api/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    users.value = response.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }
};

const updatePermissions = async (user) => {
  try {
    const token = localStorage.getItem("token");
    await axios.put(
      `http://localhost:3000/api/admin/users/${user.id}/permissions`,
      {
        canEdit: user.canEdit,
        canDelete: user.canDelete,
        canViewAll: user.canViewAll,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    console.error("Failed to update permissions:", error);
  }
};

onMounted(fetchUsers);
</script>
