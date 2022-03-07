import Storage from "@/util/storage";
import * as types from "../../mutation-types";
import categoryAPI from "../../../api/category";
import { CATEGORIES_STORAGE_KEY } from "../../../constants";

export default {
  namespaced: true,
  state: {
    categories: []
  },
  mutations: {
    [types.RECIEVE_CATEGORIES](state, categories) {
      state.categories = categories;
    }
  },
  actions: {
    async fetchCategories({ commit }) {
      try {
        const { data } = await categoryAPI.getCategories();
        Storage.set(CATEGORIES_STORAGE_KEY, data);
        commit(types.RECIEVE_CATEGORIES, data);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    }
  }
};
