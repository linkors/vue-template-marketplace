<template>
  <div class="footer-action">
    <div class="footer-button" @click="toggleCategorySelect">
      <img src="@/assets/images/server.svg" />
      category
    </div>
    <div class="footer-button" @click="toggleOrderSelect">
      <img src="@/assets/images/list.svg" />
      sort by
    </div>
    <div
      class="footer-action-popup footer-category-select"
      v-show="categorySelectShow"
    >
      <label v-for="(category, index) of categories" :key="index"
        ><input
          type="checkbox"
          :checked="selectedCategories.includes(category)"
          @change="handleChangeCategeory(category, $event)"
        />{{ category }}</label
      >
    </div>
    <div
      class="footer-action-popup footer-sort-select"
      v-show="orderSelectShow"
    >
      <div v-for="(order, index) of orderBy" :key="index" @click="handleChangeOrder(order.sortBy)">
        {{ order.label }}
        <img
          src="@/assets/images/check.svg"
          class="order-check"
          v-if="order.sortBy === selectedOrder"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";

import {
  SORT_HIGHEST_PRICE,
  SORT_LOWEST_PRICE,
  SORT_BY_NAME_PRICE
} from "@/constants";

export default {
  name: "FooterAction",
  data() {
    return {
      categorySelectShow: false,
      orderSelectShow: false
    };
  },
  methods: {
    ...mapActions("cart", ["addCart"]),
    ...mapActions("products", ["changeOrder", "changeCategoryFilter"]),
    toggleCategorySelect() {
      this.categorySelectShow = !this.categorySelectShow;
      this.orderSelectShow = false;
    },
    toggleOrderSelect() {
      this.orderSelectShow = !this.orderSelectShow;
      this.categorySelectShow = false;
    },
    handleChangeOrder(order) {
      this.changeOrder(order);
    },
    handleChangeCategeory(category, e) {
      this.changeCategoryFilter({
        newCategory: category,
        isSelected: e.target.checked
      });
    }
  },
  computed: {
    ...mapState("category", ["categories"]),
    ...mapState("products", ["selectedCategories", "selectedOrder"]),
    ...mapGetters("user", ["isLoggedIn"]),
    orderBy() {
      return [
        {
          sortBy: SORT_LOWEST_PRICE,
          label: "Lowest Price"
        },
        {
          sortBy: SORT_HIGHEST_PRICE,
          label: "Highest Price"
        },
        {
          sortBy: SORT_BY_NAME_PRICE,
          label: "Name"
        }
      ];
    }
  }
};
</script>
<style scoped>
.footer-action {
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  height: 50px;
  background-color: white;
  z-index: 3;
  width: 100%;
  border-top: 1px solid rgb(201, 201, 201);
}
.footer-button {
  flex: 0 0 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.footer-button:first-child {
  border-right: 1px solid rgb(223, 223, 223);
}
.footer-button img {
  margin-right: 16px;
}
.footer-action-popup {
  position: absolute;
  bottom: 51px;
  width: 50%;
  text-align: left;
  background-color: white;
  border-radius: 8px 8px 0 0;
  padding: 8px 12px 0 12px;
  border: 1px solid rgb(201, 201, 201);
  flex-direction: column;
}
.footer-action-popup label,
.footer-action-popup div {
  display: flex;
  padding-bottom: 8px;
  padding-top: 8px;
  border-bottom: 1px solid #eee;
}
.footer-action-popup div {
  justify-content: space-between;
}
.footer-action-popup input {
  margin-right: 8px;
}
.footer-category-select {
  left: 0;
}
.footer-sort-select {
  right: 0;
}
</style>
