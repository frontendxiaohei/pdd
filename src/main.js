import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
// 引入相关模块
import 'common/static/css/reset.css'
import LyTab from 'ly-tab'
Vue.use(LyTab)
// 引入懒加载
import VueLazyLoad from 'vue-lazyload'
import loading from 'common/images/timg.gif'
Vue.use(VueLazyLoad, {
  preLoad: 1,
  loading: loading,
  attempt: 1
});
// 引入mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
