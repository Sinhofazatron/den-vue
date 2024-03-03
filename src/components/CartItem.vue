<script setup>
defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number,
});

const emit = defineEmits(["onClickRemove"]);
</script>

<template>
  <div class="flex border items-center border-slate-200 p-4 rounded-xl gap-4">
    <img class="w-16 h-16" :src="imageUrl" alt="sneakers" />
    <div class="flex flex-col">
      <p>{{ title }}</p>
      <div class="flex justify-between mt-2">
        <b>{{ price }} руб</b>
        <img
          @click="() => emit('onClickRemove')"
          class="opacity-50 hover:opacity-100 transition cursor-pointer"
          src="/close.svg"
          alt="close"
        />
      </div>
    </div>
  </div>
</template>
