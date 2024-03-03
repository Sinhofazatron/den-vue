<script setup>
defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  onClickFavorite: Function,
  isFavorites: Boolean,
});
</script>

<template>
  <div
    class="min-w-64 relative flex flex-col w-full border border-slate-100 rounded-xl p-8 cursor-pointer transition hover:shadow-xl hover:transform hover:-translate-y-2"
  >
    <img
      v-if="!isFavorites"
      @click="onClickFavorite"
      :src="isFavorite ? '/like-2.svg' : '/like-1.svg'"
      alt="svg"
      class="absolute top-8 left-8"
    />
    <img :src="imageUrl" alt="sneakers" />
    <p class="mt-2">{{ title }}</p>
    <div class="flex justify-between mt-5">
      <div class="flex flex-col">
        <span class="text-slate-400">цена</span>
        <b>{{ price }} р</b>
      </div>
      <img
        v-if="!isFavorites"
        @click="onClickAdd"
        :src="isAdded ? '/checked.svg' : '/plus.svg'"
        alt="plus"
      />
    </div>
  </div>
</template>
