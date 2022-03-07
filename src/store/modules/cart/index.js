import * as types from "../../mutation-types";
import Storage from "@/util/storage";
import { CART_STORAGE_KEY } from "../../../constants";

export default {
  namespaced: true,
  state: {
    products: []
  },
  mutations: {
    [types.UPDATE_CART](state, products) {
      state.products = products;
    },
    [types.CLEAR_CART](state) {
      state.products = [];
    }
  },
  actions: {
    clearCart({ commit }) {
      commit(types.CLEAR_CART);
    },
    addCart({ state, commit, rootState }, productToAdd) {
      const { products } = state;
      let newProducts = products.slice(0);
      if (products.find(product => product.id === productToAdd.id)) {
        newProducts = products.map(product => {
          if (product.id === productToAdd.id) {
            if (product.counter) product.counter++;
            else product.counter = 1;
          }
          return product;
        });
      } else {
        newProducts.push({
          ...productToAdd,
          counter: 1
        });
      }

      const username = rootState.user.username;
      const currentCart = Storage.get(CART_STORAGE_KEY);
      currentCart[username] = newProducts;
      Storage.set(CART_STORAGE_KEY, currentCart);
      commit(types.UPDATE_CART, newProducts);
    }
  },
  getters: {
    totalCart(state) {
      return state.products.reduce((prevValue, product) => {
        return prevValue + product.counter;
      }, 0);
    }
  }
};
