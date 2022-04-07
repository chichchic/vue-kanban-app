import client from "@/api/client";
import auth from "@/api/auth";

jest.mock("@/api/client");

describe("Auth API module", () => {
  describe("login", () => {
    const token = "1234567890abcdef";
    const userId = 1;
    const address = "foo@domain.com";
    const password = "123456";
    describe("successed", () => {
      it("got token,userId", async () => {
        client.post.mockResolvedValueOnce(
          new Promise((res) => {
            res({ data: { token, userId }, status: 200 });
          })
        );
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
        try {
          jest
            .spyOn(client, "post")
            .mockImplementation(() =>
              Promise.reject({ data: { message }, status: 401 })
            );
          await auth.login({ address, password });
        } catch (err) {
          expect(err.message).toEqual(message);
        }
      });
    });
  });
});
