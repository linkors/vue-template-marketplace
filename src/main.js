import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/main.css";
import Storage from "./util/storage";
import { USER_STORAGE_KEY, CART_STORAGE_KEY } from "./constants";
import { SET_USER, UPDATE_CART } from "./store/mutation-types";

Vue.config.productionTip = false;

const username = Storage.get(USER_STORAGE_KEY);

if (username) {
  store.commit(`user/${SET_USER}`, username);
  const currentCart = Storage.get(CART_STORAGE_KEY);
  if (currentCart && currentCart[username]) {
    store.commit(`cart/${UPDATE_CART}`, currentCart[username]);
  }
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
