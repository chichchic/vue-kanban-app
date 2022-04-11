import axios from "axios";

const list = {
  namespace: true,
  state: {
    lists: null,
  },
  mutation: {
    FETCH_ALL_TASKLIST(state, lists) {
      state.lists = lists;
    },
    ADD_TASK(state, { id, name, listId }) {
      const list = state.lists.find((list) => list.id === listId);
      list.items.push({ id, name, listId });
    },
    UPDATE_TASK(state, { id, name, description, listId }) {
      const list = state.lists.find((list) => list.id === listId);
      const task = list.items.find((item) => item.id === id);
      task.name = name || task.name;
      task.description = description || task.description;
    },
    REMOVE_TASK(state, { id, listId }) {
      const list = state.lists.find((list) => list.id === listId);
      list.items.splice(
        list.items.findIndex((item) => item.id === id),
        1
      );
    },
  },
  action: {
    async fetchList({ commit }) {
      const { lists } = await axios.get(`${process.env.API_KEY}/lists`);
      commit("FETCH_ALL_TASKLIST", lists);
    },
    async addTask({ commit }, { id, name, listId }) {
      await axios.post(`${process.env.API_KEY}/tasks/add`, {
        id,
        name,
        listId,
      });
      commit("ADD_TASK", { id, name, listId });
    },
    async updateTask({ commit }, { id, name, description, listId }) {
      await axios.post(`${process.env.API_KEY}/tasks/${id}/update`, {
        id,
        name,
        description,
        listId,
      });
      commit("UPDATE_TASK", { id, name, description, listId });
    },
    async removeTask({ commit }, { id, listId }) {
      await axios.post(`${process.env.API_KEY}/tasks/${id}/remove`, {
        id,
        listId,
      });
      commit("REMOVE_TASK", { id, listId });
    },
  },
};

export default list;
