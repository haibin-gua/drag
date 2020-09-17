// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/border.css'
import './assets/reset.css'
import draggable from 'vuedraggable'
import axios from 'axios'

Vue.prototype.$http = axios.create({
  baseURL:'http://localhost:3000'
})


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
