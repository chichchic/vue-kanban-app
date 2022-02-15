import axios from "axios";

const auth = {
  namespace: true,
  state: {
    token: null,
    userId: null,
  },
  mutation: {
    AUTH_LOGIN(state, { token, userId }) {
      state.token = token;
      state.userId = userId;
    },
    AUTH_LOGOUT(state) {
      state.token = null;
      state.userId = null;
    },
  },
  action: {
    async login({ commit }) {
      const { token, userId } = await axios.get(
        `${process.env.API_KEY}/auth/login`
      );
      commit("AUTH_LOGIN", { token, userId });
    },
    async logout({ commit }) {
      await axios.get(`${process.env.API_KEY}/auth/logout`);
      commit("AUTH_LOGOUT");
    },
  },
};

export default auth;
