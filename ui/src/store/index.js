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
  },
  actions: {
    authenticateUser(vuexContext, authData) {
      return axios
        .post("/login", authData)
        .then((result) => {
          console.log(result.data);
          vuexContext.commit("setToken", result.data);
        })
        .catch((e) => console.log(e));
    },
  },
  getters: {
    isAuthenticated(state) {
      return state.token;
    },
  },
});

export default store;
