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
Vue.use(vant.Dialog)
Vue.use(vant.ActionSheet)

axios.defaults.baseURL = 'https://exchange.gd-juzheng.com/api'
Vue.prototype.axios = axios

// axios.interceptors.request.use(config => {
//   return config
// },
// error => {
//   return Promise.error(error)
// })

// 不支持CDN？？
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

Vue.use(VueResource);
Vue.http.options.emulateJSON = true

Vue.config.productionTip = false
new Vue({
  store,
  i18n,
  router,
  render: h => h(App)
}).$mount('#app')
