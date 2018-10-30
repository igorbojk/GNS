import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
import apiService from '@/services/apiService'
import { db } from '../db/db';

const store = new Vuex.Store({
    state: {
        query: '',
        list: [],
        filteredList: [],
        isLoadingList: false
    },
    mutations: {
        SET_LIST: (state, list) => {
            state.list = list;
            state.isLoadingList = false;
        },
        FILTER_LIST: (state, query) => {
            state.filteredList = state.list.filter((elem) => {
                if (elem.name.toLowerCase().indexOf(state.query.toLowerCase()) !== -1 ||
                elem.location.toLowerCase().indexOf(state.query.toLowerCase()) !== -1 ||
                elem.currency.toString().toLowerCase().indexOf(state.query.toLowerCase()) !== -1) {
                    return elem;
                }
            });
        },
        UPDATE_ITEM: (state, data) => {
            db.ref('items').child(data.key).set(data.item);
        },
        SET_LOADING_LIST: (state, data) => {
            state.isLoadingList = data;
        },
        SET_QUERY: (state, query) => {
            state.query = query;
        }
    },
    getters: {
        filteredList: (state) => {
            return state.filteredList = state.list.filter((elem) => {
                if (elem.name.toLowerCase().indexOf(state.query.toLowerCase()) !== -1 ||
                elem.location.toLowerCase().indexOf(state.query.toLowerCase()) !== -1 ||
                elem.currency.toString().toLowerCase().indexOf(state.query.toLowerCase()) !== -1) {
                    return elem;
                }
            });
        },
        currencySum: (state) => {
            return state.filteredList.reduce((a , b) => {
                return a + b.currency;
            }, 0)
        },
        isLoadingList: (state) => {
            return state.isLoadingList;
        }
    },
    actions: {
        GET_JSON({commit}) {
            apiService.getJson().then(result => {
                result.data.forEach(i => {
                    db.ref('items').push(i);
                })
            })
        },
        SET_LIST({commit}) {
            commit('SET_LOADING_LIST', true);
            db.ref('items').once('value').then(result => {
                // Костыль ибо раньше файербез отдавал массивом а теперь обьектом. 
                // Если нужно разберусь позже. Для тестовго думаю можно костыльнуть.
                // Вообще в задании нужно исппользовать vuex + firebase, не совсем понимаю этого.
                // Не доводилось вместе исспользовать да и примеров совместного 
                // использования кроме как для логина не видел.
                let keys = Object.keys(result.val());
                let values = Object.values(result.val());
                values.map((element, index) => element.key = keys[index]);
                commit('SET_LIST', values);
            })
        },
        FILTER_LIST({commit}, name) {
            commit('FILTER_LIST', name);
        },
        UPDATE_ITEM({commit}, data) {
            commit('UPDATE_ITEM', data);
        },
        SET_QUERY({commit}, query){
            commit('SET_QUERY', query);
        }
    }
});

export default store;