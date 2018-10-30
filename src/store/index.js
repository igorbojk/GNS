import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
import apiService from '../services/apiService'

const store = new Vuex.Store({
    state: {
        list: [],
        filteredList: []
    },
    mutations: {
        SET_LIST: (state, list) => {
            state.list = list;
            state.filteredList = list;
        },
        FILTER_LIST: (state, name) => {
            state.filteredList = state.list.filter((elem) => elem.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 );
        }
    },
    getters: {
        filteredList: (state) => {
            return state.filteredList;
        },
        currencySum: (state) => {
            return state.filteredList.reduce((a , b) => {
                return a + b.currency;
            }, 0)
        }
    },
    actions: {
        GET_JSON({commit}) {
            apiService.getJson().then(result => {
                commit('SET_LIST', result.data);
            })
        },
        FILTER_LIST({commit}, name) {
            commit('FILTER_LIST', name);
        }
    }
});

export default store;