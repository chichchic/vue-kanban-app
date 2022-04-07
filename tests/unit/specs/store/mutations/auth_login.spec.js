import mutation from "@/store/mutations";
describe("AUTH_LOGIN mutation", () => {
  it("mutation's payload value must have auth", () => {
    const state = [];
    const token = "123456789@abcdef";
    const userId = 1;
    mutation.AUTH_LOGIN(state, { token, userId });
    expect(state.auth).toEqual({ token, userId });
  });
});
