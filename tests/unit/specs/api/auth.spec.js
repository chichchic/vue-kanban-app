import axios from "axios";
import auth from "@/api/auth";
import client from "@/api/client";

jest.mock("@/api/client");

const mockAuth = (adapter) => {
  client.post = axios.create({ adapter }).post;
};

describe("Auth API module", () => {
  describe("login", () => {
    const token = "1234567890abcdef";
    const userId = 1;
    const address = "foo@domain.com";
    const password = "123456";
    describe("successed", () => {
      it("got token,userId", async () => {
        const adapter = () =>
          new Promise((response) => {
            response({ data: { token, userId }, status: 200 });
          });
        mockAuth(adapter);
        const res = await auth.login({
          address,
          password,
        });
        expect(res.data).toEqual({ token, userId });
      });
    });
    describe("Error", () => {
      it("got Error message", async () => {
        const message = "failed login";
        const adapter = () =>
          new Promise((response, reject) => {
            const err = new Error(message);
            err.response = { data: { message }, status: 401 };
            reject(err);
          });
        mockAuth(adapter);
        try {
          await auth.login({ address, password });
        } catch (err) {
          expect(err.message).toEqual(message);
        }
      });
    });
  });
});
