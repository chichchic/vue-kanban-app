import Vue from "vue";
import VueRouter from "vue-router";
import KbnLoginView from "@/components/templates/KbnLoginView.vue";
import KbnBoardView from "@/components/templates/KbnBoardView.vue";
import KbnTaskDetailModal from "@/components/templates/KbnTaskDetailModal.vue";
import store from "@/store/index.js";
const isLogined = store.state.auth.token !== null ? true : false;
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "board",
    component: KbnBoardView,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: KbnLoginView,
    beforeEnter: (to, from, next) => {
      if (isLogined) {
        return next({ name: "borad" });
      }
      return next();
    },
  },
  {
    path: "/tasks/:id",
    name: "taskDetailModal",
    component: KbnTaskDetailModal,
    meta: { requiresAuth: true },
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) {
    next();
    return;
  }
  if (isLogined) {
    next();
  } else {
    next({ name: "login" });
  }
});

export default router;
