import Vue from 'vue';
import Router from 'vue-router';
import Board from "@/components/Board";
import Modal from "@/components/Modal";

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Board,
      name: 'home',
      children: [
        {
          path: 'task/:id',
          name: 'task',
          component: Modal
        }
      ]
    },
    {
      path: '*',
      redirect: {name: 'home'}
    }
  ]
});