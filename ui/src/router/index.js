import Vue from "vue";
import VueRouter from "vue-router";

import ProductList from "../components/ProductList";
import LoginComp from "../components/LoginComp";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/products",
    component: ProductList,
    beforeEnter: (to, from, next) => {
      if (!store.getters.isAuthenticated) {
        console.log(store.getters.isAuthenticated);
        return router.push("/auth");
      }
      return next();
    },
  },
  {
    path: "/auth",
    component: LoginComp,
  },
];

const router = new VueRouter({ mode: "history", routes: routes });

export default router;
