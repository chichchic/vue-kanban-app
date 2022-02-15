import Vue from "vue";
import Vuex from "vuex";
import auth from "./Auth";
import list from "./List";
import task from "./Task";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { auth, list, task },
});
