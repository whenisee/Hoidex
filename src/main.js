import App from './App.vue'
import router from './router'
import store from './store'
import './filter/index.js'
import './assets/css/reset.css'
import './plugins/vant'
import i18n from '../src/assets/common/lang/index'


axios.defaults.baseURL = 'https://hoidex.com/api'
Vue.prototype.axios = axios
axios.interceptors.request.use(config => {
  config.baseURL = "https://hoidex.com/api"
  return config
})

Vue.use(VueResource);
Vue.http.options.emulateJSON = true

Vue.config.productionTip = false
new Vue({
  store,
  i18n,
  router,
  render: h => h(App)
}).$mount('#app')
