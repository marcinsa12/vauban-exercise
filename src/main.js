import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import {swapi} from './tools/swapi'

Vue.config.productionTip = false
Vue.prototype.$swapi = swapi

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')