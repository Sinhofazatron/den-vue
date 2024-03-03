<script setup>
import { computed, inject, ref } from "vue";
import axios from "axios";
import DrawerHead from "./DrawerHead.vue";
import CartItemList from "./CartItemList.vue";
import InfoBlock from "./InfoBlock.vue";

const props = defineProps({
  totalPrice: Number,
  vatPrice: Number,
  isCreatingOrder: Boolean,
});

const isCreating = ref(false);
const orderId = ref(null);
const { cart, closeDrawer } = inject("cart");

const buttonDisabled = computed(() =>
  props.isCreatingOrder ? true : props.totalPrice ? false : true,
);

const createOrder = async () => {
  try {
    isCreating.value = true;
    const { data } = await axios.post(
      `https://d70e5867280ed10b.mokky.dev/orders`,
      {
        items: cart.value,
        totalPrice: props.totalPrice.value,
      },
    );

    cart.value = [];

    orderId.value = data.id;
    return data;
  } catch (error) {
    console.log(error);
  } finally {
    isCreating.value = false;
  }
};
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
  <div class="w-96 h-full fixed right-0 top-0 z-20 p-8 bg-slate-300">
    <DrawerHead />
    <div v-if="!totalPrice || orderId">
      <InfoBlock
        v-if="orderId"
        title="Заказ оформлен!"
        :description="`Ваш заказ №${orderId} скоро будет передан курьерской службе`"
        image-url="/order-success-icon.png"
      />
      <InfoBlock
        v-if="!totalPrice && !orderId"
        title="Корзина пуста"
        description="Добавьте товар"
        image-url="/package-icon.png"
      />
    </div>

    <CartItemList />
    <div v-if="totalPrice" class="flex flex-col gap-3 mb-4">
      <div class="flex gap-2">
        <span>Итого:</span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>{{ totalPrice }} руб</b>
      </div>
      <div class="flex gap-2">
        <span>Налог 5%:</span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>{{ vatPrice }} руб</b>
      </div>
      <button
        :disabled="buttonDisabled"
        @click="createOrder"
        class="bg-lime-500 w-full rounded-xl py-3 hover:bg-lime-400 disabled:bg-slate-400"
      >
        Оформить заказ
      </button>
    </div>
  </div>
</template>
