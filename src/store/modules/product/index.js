import * as types from "../../mutation-types";
import product from "../../../api/product";

export default {
  namespaced: true,
  state: {
    product: {},
    liked: false,
    isLoading: false
  },
  mutations: {
    [types.RECIEVE_PRODUCT](state, product) {
      state.product = product;
    },
    [types.SET_LOADING_PRODUCT](state, isLoading) {
      state.isLoading = isLoading;
    },
    [types.SET_PRODUCT_LIKE](state, liked) {
      state.liked = liked;
    }
  },
  actions: {
    async fetchProduct({ commit }, id) {
      commit(types.SET_LOADING_PRODUCT, true);
      const response = await product.getProduct(id);
      commit(types.RECIEVE_PRODUCT, response.data);
      commit(types.SET_LOADING_PRODUCT, false);
    },
    toggleLike({ commit, state }) {
      commit(types.SET_PRODUCT_LIKE, !state.liked);
    }
  }
};
