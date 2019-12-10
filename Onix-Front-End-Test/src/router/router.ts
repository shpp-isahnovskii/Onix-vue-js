import Vue from 'vue';
import VueRouter from 'vue-router';

import tasks from '../components/navigation/tasks.vue'
import activity from '../components/navigation/activity.vue'
import calendar from '../components/navigation/calendar.vue'
import kanban from '../components/navigation/kanban.vue'
import files from '../components/navigation/files.vue'
import pageNotFound from '../components/errors/pageNotFound.vue'

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/tasks'
    },
    { 
      path: '*', 
      name: '404',
      component: pageNotFound
    },
    {
      path: '/activity',
      name: 'Activity',
      component: activity
    },
    {
      path: '/tasks',
      name: 'Tasks',
      component: tasks
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: calendar
    },
    {
      path: '/files',
      name: 'Files',
      component: files
    },
    {
      path: '/kanban',
      name: 'Kanban',
      component: kanban
    }
  ]
},
);