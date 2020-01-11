// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router/router'

Vue.config.productionTip = false

export const EventBusTasks = new Vue();

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  render: h => h(App)
}).$mount("#app");
