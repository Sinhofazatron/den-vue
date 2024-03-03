<script setup>
import axios from "axios";
import { inject, onMounted, reactive, ref, watch } from "vue";
import debounce from "lodash.debounce";

import CardList from "../components/CardList.vue";

const { cart, addToCart, removeFromCart } = inject("cart");
const items = ref([]);
const filters = reactive({
  sortBy: "",
  searchQuery: "",
});

const onClickCart = (item) => {
  if (!item.isAdded) {
    addToCart(item);
  } else {
    removeFromCart(item);
  }
};

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value;
};

const onChangeSearchInput = debounce((event) => {
  filters.searchQuery = event.target.value;
}, 500)

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        item_id: item.id
      };

      const { data } = await axios.post(
        "https://d70e5867280ed10b.mokky.dev/favorites",
        obj,
      );

      item.isFavorite = true;
      item.favoriteId = data.id;
    } else {
      await axios.delete(
        `https://d70e5867280ed10b.mokky.dev/favorites/${item.favoriteId}`,
      );
      item.isFavorite = false;
      item.favoriteId = null;
    }
  } catch (error) {
    console.log(error);
  }
};

const fatchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(
      `https://d70e5867280ed10b.mokky.dev/favorites`,
    );
    items.value = items.value.map((item) => {
      const favorite = favorites.find(
        (favorite) => favorite.item_id === item.id,
      );

      if (!favorite) {
        return item;
      }

      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id,
      };
    });
  } catch (error) {
    console.log(error);
  }
};

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy,
    };

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`;
    }

    const { data } = await axios.get(
      `https://d70e5867280ed10b.mokky.dev/items`,
      {
        params,
      },
    );
    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      favoriteId: null,
      isAdded: false,
    }));
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  const localCart = localStorage.getItem("cart");
  cart.value = localCart ? JSON.parse(localCart) : [];

  await fetchItems();
  await fatchFavorites();

  items.value = items.value.map(item => ({
    ...item,
    isAdded: cart.value.some(cartItem => cartItem.id === item.id)
  }))
});

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false,
  }));
});

watch(filters, fetchItems);
</script>

<template>
  <div class="p-10 flex justify-between items-center">
    <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>
    <div class="flex gap-4">
      <select
        @change="onChangeSelect"
        name=""
        id=""
        class="py-2 px-3 border rounded-md outline-none"
      >
        <option value="name">По названию</option>
        <option value="price">По возрастанию</option>
        <option value="-price">По убыванию</option>
      </select>
      <div>
        <input
          @input="onChangeSearchInput"
          class="border rounded py-2 px-3"
          type="text"
          placeholder="поиск..."
        />
      </div>
    </div>
  </div>
  <CardList
    :items="items"
    @addToFavorite="addToFavorite"
    @add-to-cart="onClickCart"
  />
</template>
