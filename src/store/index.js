import Vue from "vue";
import Vuex from "vuex";

import products from "./modules/products";
import product from "./modules/product";
import cart from "./modules/cart";
import user from "./modules/user";
import category from "./modules/category";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    products,
    product,
    cart,
    user,
    category
  }
});
