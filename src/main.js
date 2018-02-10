// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { WechatPlugin } from 'vux'
import App from './App'
import router from './router'
import store from './store/index'
import { sync } from 'vuex-router-sync'

Vue.config.productionTip = false
Vue.use(WechatPlugin)
sync(store, router)
new Vue({
    el: '#app',
    store,
    router,
    components: {
        App
    },
    template: '<App/>'
})
