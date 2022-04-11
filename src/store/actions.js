import api from "@/api";

export default {
  async login({ commit }, authInfo) {
    const { token, userId } = await api.Auth.login(authInfo);
    commit("AUTH_LOGIN", { token, userId });
  },
};
