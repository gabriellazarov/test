import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";

import ProductList from "./components/ProductList";
import LoginComp from "./components/LoginComp";

Vue.use(VueRouter);

const routes = [
  {
    path: "/products",
    component: ProductList,
  },
  {
    path: "/login",
    component: LoginComp,
  },
];

const router = new VueRouter({ mode: "history", routes: routes });

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
