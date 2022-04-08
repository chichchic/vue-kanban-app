import { mount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import Vuex from "vuex";
import { authorizeToken } from "@/router/guards";
import mockStore from "@/store";
jest.mock("@/store");

const App = {
  name: "app",
  render: (h) => h("router-view"),
};
const Top = {
  name: "top",
  render: (h) => h("p", ["top"]),
};
const Login = {
  name: "login",
  render: (h) => h("p", ["login"]),
};

const setup = (state) => {
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  localVue.use(Vuex);
  const store = new Vuex.Store({ state });
  const router = new VueRouter({
    routes: [
      {
        path: "/",
        component: Top,
        meta: { requiresAuth: true },
      },
      {
        path: "/login",
        component: Login,
      },
    ],
  });
  mockStore.state = store.state;
  router.beforeEach(authorizeToken);
  return mount(App, {
    localVue,
    store,
    router,
  });
};

describe("beforeEach guard hook", () => {
  describe("it have authentication token", () => {
    it("proceed as is", () => {
      const app = setup({
        auth: {
          token: "1234567890abcdef",
          userId: 1,
        },
      });
      expect(app.text()).toEqual("top");
    });
  });
  describe("it don't have authentication token", () => {
    it("redirect /login", () => {
      const app = setup({
        auth: {},
      });
      expect(app.text()).toEqual("login");
    });
  });
});
