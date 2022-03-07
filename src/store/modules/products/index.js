import * as types from "../../mutation-types";
import product from "../../../api/product";
import {
  SORT_HIGHEST_PRICE,
  SORT_LOWEST_PRICE,
  SORT_BY_NAME_PRICE
} from "@/constants";

export default {
  namespaced: true,
  state: {
    products: [],
    isLoading: false,
    selectedCategories: [],
    selectedOrder: SORT_BY_NAME_PRICE
  },
  mutations: {
    [types.RECIEVE_PRODUCTS](state, products) {
      state.products = products;
    },
    [types.RECIEVE_PRODUCT](state, product) {
      state.product = product;
    },
    [types.SET_LOADING_PRODUCT](state, isLoading) {
      state.isLoading = isLoading;
    },
    [types.SET_SELECTED_CATEGORY](state, { newCategory, isSelected }) {
      if (!isSelected) {
        state.selectedCategories = state.selectedCategories.filter(
          category => newCategory !== category
        );
      } else {
        state.selectedCategories = [...state.selectedCategories, newCategory];
      }
    },
    [types.SET_SELECTED_ORDER](state, selectedOrder) {
      state.selectedOrder = selectedOrder;
    }
  },
  actions: {
    async fetchProducts({ commit }) {
      commit(types.SET_LOADING_PRODUCT, true);
      const response = await product.getProducts();
      commit(types.RECIEVE_PRODUCTS, response.data);
      commit(types.SET_LOADING_PRODUCT, false);
    },
    async fetchProduct({ commit }, id) {
      commit(types.SET_LOADING_PRODUCT, true);
      const response = await product.getProduct(id);
      commit(types.RECIEVE_PRODUCT, response.data);
      commit(types.SET_LOADING_PRODUCT, false);
    },
    changeOrder({ commit }, order) {
      commit(types.SET_SELECTED_ORDER, order);
    },
    changeCategoryFilter({ commit }, { newCategory, isSelected }) {
      commit(types.SET_SELECTED_CATEGORY, { newCategory, isSelected });
    }
  },
  getters: {
    processProducts(state) {
      const { selectedOrder, selectedCategories } = state;
      let products = state.products.slice(0);

      if (selectedCategories.length) {
        products = products.slice(0).filter(product => {
          return selectedCategories.includes(product.category);
        });
      }
      if (selectedOrder) {
        products = products.sort((productA, productB) => {
          if (selectedOrder === SORT_HIGHEST_PRICE) {
            if (productA.price > productB.price) return -1;
            else if (productA.price < productA.price) return;
            return 0;
          } else if (selectedOrder === SORT_LOWEST_PRICE) {
            if (productA.price < productB.price) return -1;
            else if (productA.price > productA.price) return;
            return 0;
          } else if (selectedOrder === SORT_BY_NAME_PRICE) {
            return productA.title.localeCompare(productB.title);
          }
        });
      }
      return products;
    }
  }
};
