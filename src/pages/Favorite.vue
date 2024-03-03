<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import CardList from "@/components/CardList.vue";

const favorites = ref([]);

onMounted(async () => {
  try {
    const { data } = await axios.get(
      "https://d70e5867280ed10b.mokky.dev/favorites?_relations=items",
    );

    favorites.value = data.map(obj => obj.item);
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <h1>Закладки</h1>
  <CardList
    :items="favorites" isFavorites
  />
</template>
