<template>
  <div class="product-card">
    <div class="product-card_thumbnail">
      <img :src="product.image" :alt="product.title" />
    </div>
    <div class="product-card_content">
      <div class="product-card_title">{{ product.title }}</div>
      <div class="product-card_price">$ {{ product.price }}</div>
      <div class="product-card_category">{{ product.category }}</div>
    </div>
    <div class="product-card_footer">
      <div class="product-card_button">
        <AddToCartButton :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import AddToCartButton from "./AddToCartButton.vue";

export default {
  components: {
    AddToCartButton
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  border: 1px solid #d6d6d6;
  border-radius: 8px;
  background-color: white;
}
.product-card_thumbnail {
  width: 100%;
  position: relative;
  overflow: hidden;
}
.product-card_thumbnail::before {
  content: "";
  display: block;
  padding-top: 100%;
}
.product-card_thumbnail img {
  position: absolute;
  left: 50%;
  top: 50%;
  max-height: 100%;
  max-width: 100%;
  transform: translateX(-50%) translateY(-50%);
}
.product-card_content {
  padding: 12px 4px;
  text-align: left;
}
.product-card_title {
  width: 100%;
  font-weight: bolder;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.product-card_price {
  width: 100%;
  font-weight: bolder;
  font-size: 15px;
  margin-top: 4px;
  color: #e31e52;
}
.product-card_category {
  font-size: 12px;
  margin-top: 4x;
}
.product-card_button button {
  width: 100%;
  border-radius: 0 0 8px 8px;
}
</style>
