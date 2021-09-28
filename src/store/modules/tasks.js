import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    // Tasks with "in progress" status
    inprogress: [
      {
        id: 1,
        status: 'inprogress',
        title: '1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquam',
        description: 'Это описание задачки, съешь ещё этих мягких французских булок, да выпей же чаю',
      },
      {
        id: 2,
        status: 'inprogress',
        title: '2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquam',
        description: 'Это описание задачки, съешь ещё этих мягких французских булок, да выпей же чаю',
      },
    ],
    // Tasks with "checking" status
    checking: [
      {
        id: 3,
        status: 'checking',
        title: '3. Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquam',
        description: 'Это описание задачки, съешь ещё этих мягких французских булок, да выпей же чаю',
      },
      {
        id: 4,
        status: 'checking',
        title: '4. Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquam',
        description: 'Это описание задачки, съешь ещё этих мягких французских булок, да выпей же чаю',
      }
    ],
    // Tasks with "done" status
    done: [],
    // Tasks auto increment id
    globalId: 4
  },
  getters: {
    inprogress(state) {
      return state.inprogress;
    },
    checking(state) {
      return state.checking;
    },
    done(state) {
      return state.done;
    },
    // Search task by id
    taskById(state) {
      return id => [...state.inprogress, ...state.checking, ...state.done].find(task => {
        return task.id === id;
      });
    }
  },
  actions: {
    add(state, payload) {
      state.commit('add', payload);
    },
    relocate(state, payload) {
      state.commit('relocate', payload)
    },
    save(state, payload) {
      state.commit('save', payload)
    }
  },
  mutations: {
    // Add new task
    add(state, task) {
      if (Object.prototype.hasOwnProperty.call(state, task.status)) {
        state.globalId++;
        Object.assign(task, {id: state.globalId});
        state[task.status].push(task);
      } else {
        throw new Error('Task status not exists');
      }
    },
    // Relocate task by drag and drop
    relocate(state, data) {
      let copy = state;
      let index = copy[data.status.before].findIndex(item => item.id === data.id);
      if (index !== -1) {
        let task = copy[data.status.before][index];
        // save original task
        task.status = data.status.after;
        copy[data.status.before].splice(index, 1);
        if (data.sibling) {
          let siblingId = parseInt(data.sibling.getAttribute('data-id'));
          let siblingIndex = state[data.status.after].findIndex(item => item.id === siblingId);
          if (siblingIndex !== -1) {
            copy[data.status.after].splice(siblingIndex, 0, task);
            state = copy;
          } else {
            throw new Error('Sibling task is not found');
          }
        } else {
          state[data.status.after].push(task);
        }
      } else {
        throw new Error('Task is not found');
      }
    },
    // Save task changes in modal window
    save(state, data) {
      let index = state[data.status].findIndex(item => item.id === data.id);
      if (index !== -1) {
        Vue.set(state[data.status][index], 'title', data.title);
        Vue.set(state[data.status][index], 'description', data.description);
      } else {
        throw new Error('Task is not found');
      }
    }
  }
}