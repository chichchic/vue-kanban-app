import auth from "@/api/auth";

export default {
  async login({ commit }, authInfo) {
    try {
      const { token, userId } = await auth.login(authInfo);
      commit("AUTH_LOGIN", { token, userId });
    } catch (err) {
      return err;
    }
  },
};
