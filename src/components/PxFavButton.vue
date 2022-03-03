<template>
  <div @click="$emit('toggleStar')">
    <div v-if="showFav" class="star">
      <img src="../assets/gold-star.svg" alt="" />
    </div>
    <div v-else class="star">
      <img src="../assets/gray-star.svg" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["showFav"],
};
</script>

<style scoped>
.star {
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-color: #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
}
.star img {
  width: 20px;
  height: 20px;
}
</style>
