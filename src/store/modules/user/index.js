import * as types from "../../mutation-types";
import userAPI from "@/api/user";
import Storage from "@/util/storage";
import { USER_STORAGE_KEY } from "../../../constants";

export default {
  namespaced: true,
  state: {
    username: "",
    isLoading: false
  },
  mutations: {
    [types.SET_USER](state, username) {
      state.username = username;
    },
    [types.SET_LOADING_USER](state, isLoading) {
      state.isLoading = isLoading;
    }
  },
  actions: {
    async login({ commit }, credential) {
      commit(types.SET_LOADING_USER, true);
      const { username } = credential;
      try {
        const response = await userAPI.login(credential);
        if (response.data && response.data.token) {
          commit(types.SET_USER, username);
          Storage.set(USER_STORAGE_KEY, username);
        }
      } catch (e) {
        alert(e.response.data);
      }
      setTimeout(() => {
        commit(types.SET_LOADING_USER, false);
      }, 200);
    },
    logout({ commit }) {
      commit(types.SET_USER, "");
      Storage.set(USER_STORAGE_KEY, "");
    }
  },
  getters: {
    isLoggedIn(state) {
      return !!state.username;
    }
  }
};
