import * as types from "./mutation-types.js";
export default {
  [types.AUTH_LOGIN](state, payload) {
    state.auth = payload;
  },
};
