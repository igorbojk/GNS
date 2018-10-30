import Vue from 'vue'
import App from './App.vue'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vue2Filters from 'vue2-filters'

Vue.use(Vue2Filters)
Vue.use(BootstrapVue);

Vue.config.productionTip = false

new Vue({
    store,
    render: h => h(App)
}).$mount('#app')
