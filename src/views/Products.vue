<template>
  <div>
    <div class="loader" v-if="isLoading">Fetching...</div>
    <div v-else class="product-card-container">
      <router-link
        :to="{
          name: 'ProductDetail',
          params: {
            id: product.id
          }
        }"
        v-for="product of processProducts"
        :key="product.id"
        class="product-card-wrapper"
        custom
        v-slot="{ navigate, href }"
      >
        <a :href="href" @click.self="navigate">
          <ProductCard :product="product" />
        </a>
      </router-link>
    </div>
    <FooterAction />
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
import ProductCard from "@/components/ProductCard";
import FooterAction from "@/components/FooterAction";

export default {
  components: {
    ProductCard,
    FooterAction
  },
  mounted() {
    this.fetchProducts();
    this.fetchCategories();
  },
  methods: {
    ...mapActions("products", ["fetchProducts"]),
    ...mapActions("category", ["fetchCategories"])
  },
  computed: {
    ...mapState("products", ["isLoading"]),
    ...mapGetters("products", ["processProducts"]),
    ...mapGetters("user", ["isLoggedIn"])
  }
};
</script>
<style scoped>
.product-card-container {
  display: flex;
  flex-wrap: wrap;
}
.product-card-wrapper {
  flex: 0 0 50%;
  max-width: 50%;
  padding: 4px;
  box-sizing: border-box;
  text-decoration: none;
  color: inherit;
}
</style>
