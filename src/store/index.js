import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
import apiService from '@/services/apiService'

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
        },
        UPDATE_ITEM: (state, itemId, updatedItem) => {
            // state.list.find(i => i.id == itemId) = null;
            // console.log(state.list.find(i => i.id == itemId));
            // let item = state.list.find(i => i.id == itemId);
            // item = Object.assign(item, updatedItem);
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
        },
        UPDATE_ITEM({commit}, itemId, updatedItem) {
            commit('UPDATE_ITEM', itemId);
        }
    }
});

export default store;