import Vue from "vue";
import Vuex from "vuex";
import auth from "./Auth";
import task from "./Task";
import mutations from "./mutations";
import actions from "./actions";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations,
  actions,
  modules: { auth, task },
  strict: process.env.NODE_ENV !== "production",
});
