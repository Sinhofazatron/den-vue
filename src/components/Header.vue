<script setup>
defineProps({
  totalPrice: Number,
});

const emit = defineEmits(["openDrawer"]);
</script>

<template>
  <header class="flex justify-between border-b border-slate-300 p-8">
    <router-link to="/"
      ><div class="flex items-center gap-4">
        <img src="/logo.png" alt="logo" class="w-10" />
        <div>
          <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
          <p class="text-slate-500">Кроссы на каждый день</p>
        </div>
      </div></router-link
    >

    <ul class="flex items-center gap-3">
      <li
        @click="() => emit('openDrawer')"
        class="flex items-center gap-2 text-gray-500 hover:text-black transition cursor-pointer"
      >
        <img src="/cart.svg" alt="cart" /><b>{{ totalPrice }} Р</b>
      </li>

      <router-link to="/favorites"
        ><li
          class="flex items-center gap-2 text-gray-500 hover:text-black transition cursor-pointer"
        >
          <img src="/heart.svg" alt="favourite" /><span>Закладки</span>
        </li></router-link
      >
      
      <router-link to="/profile"
        ><li
          class="flex items-center gap-2 text-gray-500 hover:text-black transition cursor-pointer"
        >
          <img src="/profile.svg" alt="favourite" /><span>Профиль</span>
        </li></router-link
      >
    </ul>
  </header>
</template>
