// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'

Vue.config.productionTip = false


new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
}).$mount("#app");
