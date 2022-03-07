<template>
  <div class="menu-item">
    <img :src="icon" @click="togglePopover" />
    <transition name="fade" mode="out-in">
      <div class="popover-content" v-show="popoverShown">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
let listener = null;

export default {
  props: {
    icon: {
      type: String,
      required: true
    }
  },
  mounted() {
    listener = e => {
      if (
        !this.popoverShown &&
        (!e.target.closest(".links") || e.target.tagName === "A")
      ) {
        this.popoverShown = false;
      }
    };
    document.addEventListener("click", listener);
  },
  beforeDestroy() {
    document.removeEventListener("click", listener);
  },
  data() {
    return {
      popoverShown: false
    };
  },
  methods: {
    togglePopover() {
      this.popoverShown = !this.popoverShown;
    }
  }
};
</script>
<style scoped>
.menu-item {
  position: relative;
}
.menu-item:hover {
  cursor: pointer;
}
.popover-content {
  background-color: white;
  position: absolute;
  top: 40px;
  right: 0;
  border-radius: 4px;
  box-shadow: 1px 1px 2px #979797;
}
</style>
