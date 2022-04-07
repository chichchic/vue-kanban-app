import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import KbnLoginView from "@/components/templates/KbnLoginView.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("KbnLoginView", () => {
  let auth, $router, store, LoginFormComponentStub;
  const triggerLogin = async (loginView, target) => {
    try {
      const loginForm = loginView.getComponent(target);
      await loginForm.vm.onlogin("foo@domain.com", "12345678");
    } catch (err) {
      console.error("rising error");
    }
  };

  beforeEach(() => {
    LoginFormComponentStub = {
      name: "KbnLoginForm",
      props: ["onlogin"],
      render: (h) => h("p", ["login form"]),
    };
    $router = {
      push: jest.fn(),
    };
    auth = {
      namespaced: true,
      actions: {
        login: jest.fn(),
      },
    };
    store = new Vuex.Store({
      state: {},
      mutations: {},
      actions: {},
      modules: { auth },
    });
  });

  describe("login", () => {
    let loginView;
    describe("success", () => {
      beforeEach(() => {
        loginView = shallowMount(KbnLoginView, {
          mocks: {
            $router,
          },
          stubs: {
            "kbn-login-form": LoginFormComponentStub,
          },
          store,
          localVue,
        });
      });
      it("redirect to hompage root", (done) => {
        auth.actions.login.mockResolvedValue();
        triggerLogin(loginView, LoginFormComponentStub);
        setImmediate(() => {
          const mockFn = $router.push;
          expect(mockFn).toHaveBeenCalled();
          expect(mockFn).toBeCalledWith({ path: "/" });
          done();
        });
      });
    });
    describe("fail", () => {
      let throwReject;
      beforeEach(() => {
        loginView = shallowMount(KbnLoginView, {
          mocks: {
            $router,
          },
          stubs: {
            "kbn-login-form": LoginFormComponentStub,
          },
          store,
          localVue,
        });
        throwReject = jest.spyOn(loginView.vm, "throwReject");
      });
      it("error handler is called", () => {
        const message = new Error("login failed");
        auth.actions.login.mockRejectedValue(message);
        triggerLogin(loginView, LoginFormComponentStub);
        setImmediate(() => {
          const mockFn = auth.actions.login;
          expect(mockFn).toHaveBeenCalled();
          expect(throwReject).toBeCalledWith(message);
        });
      });
    });
  });
});
