import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vue2Filters from 'vue2-filters'
import VueFire from 'vuefire'
import Vuelidate from 'vuelidate'


Vue.use(Vuelidate)

Vue.use(Vue2Filters);
Vue.use(BootstrapVue);

Vue.use(VueFire);


Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
