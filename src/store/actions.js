import api from "@/api";

export default {
  async login({ commit }, authInfo) {
    try {
      const { token, userId } = await api.Auth.login(authInfo);
      commit("AUTH_LOGIN", { token, userId });
    } catch (err) {
      return err;
    }
  },
};
