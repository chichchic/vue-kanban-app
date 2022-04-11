import * as types from "@/store/mutation-types";
import actions from "@/store/actions";
import api from "@/api";

jest.mock("@/api");
const mockLoginAction = (login) => {
  api.Auth = {
    login,
  };
};
describe("login action", () => {
  const address = "foo@domain.com";
  const password = "12345678";
  let commit;
  describe("Auth.login success", () => {
    const token = "1234567890abcdef";
    const userId = 1;
    beforeEach(async () => {
      const login = () => Promise.resolve({ token, userId });
      mockLoginAction(login);
      commit = jest.fn();
      await actions.login({ commit }, { address, password });
    });
    it("successed", () => {
      expect(commit).toBeCalled();
      expect(commit).toBeCalledWith(types.AUTH_LOGIN, { token, userId });
    });
  });
  describe("Auth.login fail", () => {
    const message = "login failed";
    let future;
    beforeEach(async () => {
      const login = () => Promise.reject(new Error(message));
      mockLoginAction(login);
      commit = jest.fn();
      try {
        await actions.login({ commit });
      } catch (err) {
        future = err;
      }
    });
    it("failed", () => {
      expect(commit).toBeCalledTimes(0);
      expect(future.message).toEqual(message);
    });
  });
});
