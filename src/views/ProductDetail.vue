<template>
  <div>
    <GoBack />
    <div class="loader" v-if="isLoading">Fetching...</div>
    <section class="product-detail" v-else>
      <div class="product-detail_thumbnail">
        <img :src="product.image" :alt="product.title" />
      </div>
      <div class="product-info-wrapper">
        <div class="product-detail_info">
          <div class="product-detail_price">$ {{ product.price }}</div>
          <div class="product-detail_title">{{ product.title }}</div>
          <div class="product-detail_category">{{ product.category }}</div>
        </div>
        <div>
          <div
            class="product-like-button"
            @click="toggleLike"
            :class="{ liked: liked }"
          >
            <img src="@/assets/images/heart_white.svg" />
          </div>
        </div>
      </div>
      <div class="product-detail_content">
        <div class="product-detail_description">
          <h3>Information</h3>
          {{ product.description }}
        </div>
      </div>
      <div class="product-detail_footer">
        <div class="product-detail_button">
          <button type="button" class="btn-success">Add to Cart</button>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import GoBack from "@/components/GoBack";
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  components: {
    GoBack
  },
  mounted() {
    this.fetchProduct(this.$route.params.id);
  },
  methods: {
    ...mapActions("product", ["fetchProduct", "toggleLike"])
  },
  computed: {
    ...mapState("product", ["product", "isLoading", "liked"]),
    ...mapGetters("user", ["isLoggedIn"])
  }
};
</script>

<style scoped>
.product-detail {
  display: flex;
  flex-direction: column;
}
.product-detail_thumbnail {
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: white;
}
.product-info-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: white;
  padding: 16px;
}
.product-detail_info {
  text-align: left;
}
.product-detail_content {
  margin-top: 16px;
  background-color: white;
  margin-bottom: 60px;
}
.product-detail_thumbnail::before {
  content: "";
  display: block;
  padding-top: 100%;
}
.product-detail_thumbnail img {
  position: absolute;
  left: 50%;
  top: 50%;
  max-height: 100%;
  max-width: 100%;
  transform: translateX(-50%) translateY(-50%);
}
.product-detail_content {
  padding: 8px 12px 12px 12px;
  text-align: left;
}
.product-like-button {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.product-like-button.liked {
  background-color: #cc1b4a;
}
.product-detail_title {
  width: 100%;
  font-weight: bolder;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.product-detail_price {
  width: 100%;
  font-weight: bolder;
  font-size: 18px;
  margin-bottom: 4px;
}
.product-detail_category {
  font-size: 13px;
  margin-top: 8px;
}
.product-detail_description {
  width: 100%;
  font-size: 14px;
  margin-top: 8px;
}
.product-detail_footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}
.product-detail_button button {
  width: 100%;
  border-radius: 0;
}
</style>
