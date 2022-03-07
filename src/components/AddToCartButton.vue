<template>
  <button
    type="button"
    class="btn-success"
    @click.prevent.stop="handleAddToCart"
  >
    Add to Cart
  </button>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AddToCartButton",
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions("cart", ["addCart"]),
    handleAddToCart() {
      if (this.isLoggedIn) {
        this.addCart(this.product);
      } else {
        this.$router.push("/login");
      }
    }
  },
  computed: {
    ...mapGetters("user", ["isLoggedIn"])
  }
};
</script>
