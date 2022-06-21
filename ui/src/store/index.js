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
          vuexContext.commit("setToken", result.data.token);
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("expiry", result.data.expiry);
        })
        .catch((e) => console.log(e));
    },
    authCheck(vuexContext) {
      if (localStorage.getItem("expiry")) {
        const currentTime = new Date().getTime();

        if (currentTime < localStorage.getItem("expiry")) {
          vuexContext.commit("setToken", localStorage.getItem("token"));
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("expiry");
        }
      }
    },
    logout(vuexContext) {
      vuexContext.commit("clearToken");
      localStorage.removeItem("token");
      localStorage.removeItem("expiry");
    },
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
  },
});

export default store;
