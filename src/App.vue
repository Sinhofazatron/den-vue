<script setup>
import { computed, provide, ref, watch } from "vue";

import Header from "./components/Header.vue";
import Drawer from "./components/Drawer.vue";

const drawerOpen = ref(false);
const cart = ref([]);


const totalPrice = computed(() =>
  cart.value.reduce((acc, item) => acc + item.price, 0),
);
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100));

const closeDrawer = () => {
  drawerOpen.value = false;
};

const openDrawer = () => {
  drawerOpen.value = true;
};

const addToCart = (item) => {
  cart.value.push(item);
  item.isAdded = true;
};

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1);
  item.isAdded = false;
};



watch(
  cart,
  () => {
    localStorage.setItem("cart", JSON.stringify(cart.value));
  },
  {
    deep: true,
  },
);

provide("cart", {
  cart,
  addToCart,
  removeFromCart,
  closeDrawer,
  openDrawer,
});
</script>

<template>
  <Drawer
    v-if="drawerOpen"
    :total-price="totalPrice"
    :vat-price="vatPrice"
    :is-creating-order="isCreatingOrder"
  />
  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-10">
    <Header :total-price="totalPrice" @open-drawer="openDrawer" />
    <router-view></router-view>
  </div>
</template>
