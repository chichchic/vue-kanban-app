import KbnLoginView from "@/components/templates/KbnLoginView.vue";
import KbnBoardView from "@/components/templates/KbnBoardView.vue";
import KbnTaskDetailModal from "@/components/templates/KbnTaskDetailModal.vue";
import store from "@/store/index.js";
const isLogined = store.state.auth.token !== null ? true : false;
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

export default routes;
