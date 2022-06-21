import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: null,
    profile: "",
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setProfile(state, profile) {
      state.profile = profile;
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
          const user = result.data;
          //setting token and expiration
          vuexContext.commit("setToken", user.accessToken.token);
          localStorage.setItem("token", user.accessToken.token);
          localStorage.setItem(
            "expiry",
            new Date(user.accessToken.expiry).getTime()
          );
          //setting user profile info
          delete user.accessToken;
          const profile = JSON.stringify(user);
          vuexContext.commit("setProfile", profile);
          localStorage.setItem("profile", profile);
        })
        .catch((err) => {
          throw new Error(err.response.data);
        });
    },
    authCheck(vuexContext) {
      if (localStorage.getItem("expiry")) {
        const currentTime = new Date().getTime();

        if (currentTime < localStorage.getItem("expiry")) {
          vuexContext.commit("setToken", localStorage.getItem("token"));
          vuexContext.commit("setProfile", localStorage.getItem("profile"));
        } else {
          clearStored();
        }
      }
    },
    logout(vuexContext) {
      vuexContext.commit("clearToken");
      clearStored();
    },
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
    getProfile(state) {
      return state.profile;
    },
  },
});

const clearStored = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiry");
  localStorage.removeItem("profile");
};

export default store;
