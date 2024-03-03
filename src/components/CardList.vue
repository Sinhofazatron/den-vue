<script setup>
import Card from "./Card.vue";

defineProps({
  items: Array,
  isFavorites: Boolean
});

const emit = defineEmits(["addToFavorite", 'addToCart']);
</script>

<template>
  <div v-auto-animate class="grid grid-cols-3 gap-6">
    <Card
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :imageUrl="item.imageUrl"
      :title="item.title"
      :price="item.price"
      :onClickFavorite="() => emit('addToFavorite', item)"
      :onClickAdd="() => emit('addToCart', item)"
      :isFavorite="item.isFavorite"
      :isAdded="item.isAdded"
      :isFavorites="isFavorites"
    />
  </div>
</template>
