<template>
  <h2>webpack5-vue3-ts</h2>
  <img :src="smallImg" alt="小于10kb的图片" />
  <img :src="bigImg" alt="大于于10kb的图片" />
</template>

<script setup lang="ts">
import smallImg from '@/assets/imgs/test_img_1kb.png'
import bigImg from '@/assets/imgs/test_img_11kb.png'
import '@/app.css'
import '@/app.less'
</script>
<style scoped>
</style>