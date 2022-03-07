<template>
  <span class="go-back">
    <button @click="goBack">
      <img src="@/assets/images/chevron-left.svg" />
    </button>
  </span>
</template>

<script>
export default {
  methods: {
    goBack() {
      return this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.go-back {
  cursor: pointer;
  position: fixed;
  top: 70px;
  z-index: 10;
  left: 8px;
}
button {
  border: 0;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  text-align: center;
}
button img {
  position: relative;
  right: 3px;
}
</style>
