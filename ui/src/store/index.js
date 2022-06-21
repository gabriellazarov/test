import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    clearToken(state) {
      state.token = null;
    },
  },
  actions: {
    authenticateUser(vuexContext, authData) {
      return axios
        .post("/login", authData)
        .then((result) => {
          vuexContext.commit("setToken", result.data);
        })
        .catch((e) => console.log(e));
    },
    logout(vuexContext) {
      vuexContext.commit("clearToken");
    },
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
  },
});

export default store;
