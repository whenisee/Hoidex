import App from './App.vue'
import router from './router'
import store from './store'
import './filter/index.js'
import './assets/css/reset.css'
import i18n from '../src/assets/common/lang/index'
Vue.use(vant.Button)
Vue.use(vant.Swipe)
Vue.use(vant.SwipeItem)
Vue.use(vant.Tab)
Vue.use(vant.Tabs)
Vue.use(vant.Popup)
Vue.use(vant.Checkbox)
Vue.use(vant.CheckboxGroup)
Vue.use(vant.Step)
Vue.use(vant.Steps)
Vue.use(vant.Icon)
Vue.use(vant.Uploader)
Vue.use(vant.Loading)
Vue.use(vant.Notify)
Vue.use(vant.Switch)

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
