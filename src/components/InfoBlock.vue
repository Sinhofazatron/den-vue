<script setup>
defineProps({
  imageUrl: String,
  description: String,
  title: String,
});
</script>

<template>
  <div class="flex flex-col items-center justify-center max-w-72 mx-auto">
    <img class="h-[70px] w-[70px]" :src="imageUrl" alt="Info image" />
    <h2 class="mt-4 text-2xl font-medium">{{ title }}</h2>
    <p class="text-gray-400">{{ description }}</p>
  </div>
</template>
