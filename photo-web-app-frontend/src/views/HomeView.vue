<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Photo Web App</h1>
    <EntryForm @entry-added="refreshEntries" class="mb-8" />
    <EntryList ref="entryList" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import EntryForm from "@/components/EntryForm.vue";
import EntryList from "@/components/EntryList.vue";

const entryList = ref(null);

const refreshEntries = () => {
  entryList.value?.fetchEntries();
};
</script>
