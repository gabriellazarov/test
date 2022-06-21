import Vue from "vue";
import VueRouter from "vue-router";

import ProductList from "../components/ProductList";
import LoginComp from "../components/LoginComp";
import ProfilePage from "../components/ProfilePage";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/products",
    component: ProductList,
  },
  {
    path: "/auth",
    component: LoginComp,
  },
  {
    path: "/profile",
    component: ProfilePage,
  },
];

const router = new VueRouter({ mode: "history", routes: routes });

router.beforeEach((to, from, next) => {
  //check if the user has expired
  store.dispatch("authCheck");
  //user can't auth if already authenticated
  if (store.getters.isAuthenticated) {
    if (to.path === "/auth") return;
    return next();
  }
  //blocking everything apart from auth for unauth users
  else {
    if (from.path === "/auth") return;
    if (to.path === "/auth") return next();
    return router.replace("/auth");
  }
});

export default router;
