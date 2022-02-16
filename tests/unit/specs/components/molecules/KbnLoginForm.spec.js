import { mount } from "@vue/test-utils";
import KbnLoginForm from "@/components/molecules/KbnLoginForm.vue";

describe("KbnLoginForm", () => {
  describe("property", () => {
    describe("validation", () => {
      let loginForm;
      beforeEach(() => {
        loginForm = mount(KbnLoginForm, {
          propsData: {
            onlogin: () => {},
          },
        });
      });
      describe("email", () => {
        describe("required", () => {
          describe("empty input value", () => {
            it("validation.email.required is invalid", () => {
              loginForm.setData({
                email: "",
              });
              expect(loginForm.vm.validation.email.required).toEqual(false);
            });
          });
          describe("has input value", () => {
            it("validation.email.required is valid", () => {
              loginForm.setData({
                email: "foo@domain.com",
              });
              expect(loginForm.vm.validation.email.required).toEqual(true);
            });
          });
        });
        describe("format", () => {
          describe("is not email address format", () => {
            it("validation.email.format is invalid", () => {
              loginForm.setData({
                email: "foobar",
              });
              expect(loginForm.vm.validation.email.format).toEqual(false);
            });
          });
          describe("is email address format", () => {
            it("validation.email.required is valid", () => {
              loginForm.setData({
                email: "foo@domain.com",
              });
              expect(loginForm.vm.validation.email.format).toEqual(true);
            });
          });
        });
      });

      describe("password", () => {
        describe("required", () => {
          describe("empty input value", () => {
            it("validation.password.required is invalid", () => {
              loginForm.setData({
                password: "",
              });
              expect(loginForm.vm.validation.password.required).toEqual(false);
            });
          });
          describe("has input value", () => {
            it("validation.password.required is valid", () => {
              loginForm.setData({
                password: "xxxx",
              });
              expect(loginForm.vm.validation.password.required).toEqual(true);
            });
          });
        });
      });
    });
    describe("valid", () => {
      let loginForm;
      beforeEach(() => {
        loginForm = mount(KbnLoginForm, {
          propsData: {
            onlogin: () => {},
          },
        });
      });
      describe("all items are valid", () => {
        it("validation test result is valid", () => {
          loginForm.setData({
            email: "foo@domain.com",
            password: "12345678",
          });
          expect(loginForm.vm.valid).toEqual(true);
        });
      });
      describe("some items are invalid", () => {
        it("validation test result is invalid", () => {
          loginForm.setData({
            email: "foo@domain.com",
            password: "",
          });
          expect(loginForm.vm.valid).toEqual(false);
        });
      });
    });
  });
  describe("disableLoginAction", () => {
    let loginForm;
    beforeEach(() => {
      loginForm = mount(KbnLoginForm, {
        propsData: {
          onlogin: () => {},
        },
      });
    });
    describe("some items are invalid", () => {
      it("invalid login process", () => {
        loginForm.setData({
          email: "foo@domain.com",
          password: "",
        });
        expect(loginForm.vm.disableLoginAction).toEqual(true);
      });
    });
    describe("all items are valid and login isn't progressing", () => {
      it("valid login process", () => {
        loginForm.setData({
          email: "foo@domain.com",
          password: "12345678",
        });
        expect(loginForm.vm.disableLoginAction).toEqual(false);
      });
    });
    describe("all items are valid and login is progressing", () => {
      it("valid login process", () => {
        loginForm.setData({
          email: "foo@domain.com",
          password: "12345678",
          progress: true,
        });
        expect(loginForm.vm.disableLoginAction).toEqual(true);
      });
    });
  });
  describe("onlogin", () => {
    let loginForm;
    let onloginStub;
    beforeEach(() => {
      onloginStub = jest.fn();
      loginForm = mount(KbnLoginForm, {
        propsData: {
          onlogin: onloginStub,
        },
      });
      loginForm.setData({
        email: "foo@domain.com",
        password: "12345678",
      });
    });
    describe("resolve", () => {
      it("is resolved", (done) => {
        onloginStub.mockResolvedValue();
        expect(onloginStub).not.toHaveBeenCalled();
        expect(loginForm.vm.error).toEqual("");
        expect(loginForm.vm.disableLoginAction).toEqual(false);
        loginForm.find("button").trigger("click");
        expect(onloginStub).toHaveBeenCalled();
        expect(onloginStub).toBeCalledWith({
          email: loginForm.vm.email,
          password: loginForm.vm.password,
        });
        expect(loginForm.vm.disableLoginAction).toEqual(true);
        setImmediate(() => {
          expect(onloginStub).toHaveBeenCalled();
          expect(loginForm.vm.error).toEqual("");
          expect(loginForm.vm.disableLoginAction).toEqual(false);
          done();
        });
      });
    });
    describe("reject", () => {
      it("is rejected", (done) => {
        onloginStub.mockRejectedValue(new Error("login error!"));
        expect(onloginStub).not.toHaveBeenCalled();
        expect(loginForm.vm.error).toEqual("");
        expect(loginForm.vm.disableLoginAction).toEqual(false);
        loginForm.find("button").trigger("click");
        expect(onloginStub).toHaveBeenCalled();
        expect(onloginStub).toBeCalledWith({
          email: loginForm.vm.email,
          password: loginForm.vm.password,
        });
        expect(loginForm.vm.disableLoginAction).toEqual(true);
        setImmediate(() => {
          expect(loginForm.vm.error).toEqual("login error!");
          expect(loginForm.vm.disableLoginAction).toEqual(false);
          done();
        });
      });
    });
  });
});
