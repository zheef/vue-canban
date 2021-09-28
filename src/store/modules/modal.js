export default {
  namespaced: true,
  state: {
    show: false,
    task: null
  },
  getters: {
    show(state) {
      return state.show;
    },
    task(state) {
      return state.task;
    }
  },
  actions: {
    show(state, payload) {
      state.commit('show', payload);
    },
    close(state) {
      state.commit('close');
    }
  },
  mutations: {
    show(state, task) {
      state.task = task;
      state.show = true;
    },
    close(state) {
      state.show = false;
    }
  }
}