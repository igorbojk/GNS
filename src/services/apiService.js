import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios);

export default {

    getJson(){
        return Vue.axios.get(`http://localhost:8080/test.json`);
    }

}