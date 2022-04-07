import * as types from "@/store/mutation-types";
import actions from "@/store/actions";
import auth from "@/api/auth";

jest.mock("@/api/auth");

describe("login action", () => {
  const address = "foo@domain.com";
  const password = "12345678";
  let commit;
  describe("Auth.login success", () => {
    const token = "1234567890abcdef";
    const userId = 1;
    beforeEach(() => {
      jest.mock("@/api/auth");
      auth.login.mockResolvedValueOnce(
        Promise.resolve({
          token,
          userId,
        })
      );
      commit = jest.fn();
      actions.login({ commit }, { address, password });
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
      jest.mock("@/api/auth");
      auth.login.mockRejectedValueOnce(Promise.reject(new Error(message)));
      commit = jest.fn();
      try {
        await actions.login({ commit });
      } catch (error) {
        future = error;
      }
    });
    it("failed", () => {
      expect(commit).toBeCalledTimes(0);
      expect(future.message).toEqual(message);
    });
  });
});
