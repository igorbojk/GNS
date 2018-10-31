import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
import apiService from '@/services/apiService'
import {db} from '@/db/db';

function uniqueID(){
    function chr4(){
        return Math.random().toString(16).slice(-4);
    }
    return chr4() + chr4() +
        '-' + chr4() +
        '-' + chr4() +
        '-' + chr4() +
        '-' + chr4() + chr4() + chr4();
}

const store = new Vuex.Store({
    state: {
        query: '',
        list: [],
        singleItem: null
    },
    mutations: {
        SET_LIST: (state, list) => {
            state.list = list;
        },
        UPDATE_ITEM: (state, data) => {
            db.ref('items').child(data.key).set(data.item);
        },
        DELETE_ITEM: (state, key) => {
            db.ref('items').child(key).remove();
        },
        SET_SINGLE_ITEM: (state, key) => {
            db.ref('items').child(key).once('value').then(result => {
                state.singleItem = result.val();
            })
        },
        REMOVE_SINGLE_ITEM: (state) => {
            state.singleItem = null;
        },
        CREATE_ITEM: (state, item) => {
            const newItem = Object.assign({}, item);
            newItem.id = uniqueID();
            db.ref('items').push(newItem);
        }
    },
    getters: {
        items: (state) => {
            return state.list;
        },
        singleItem: (state) => {
            return state.singleItem;
        }
    },
    actions: {
        GET_JSON({commit}) {
            apiService.getJson().then(result => {
                result.data.forEach(i => {
                    db.ref('items').push(i);
                });
                db.ref('items').once('value').then(result => {
                    // Костыль, смотри описание в readme.txt пункт 1.
                    let keys = Object.keys(result.val());
                    let values = Object.values(result.val());
                    values.map((element, index) => element.key = keys[index]);
                    commit('SET_LIST', values);
                });
            })
        },
        SET_LIST({commit}) {
            db.ref('items').once('value').then(result => {
                // Костыль, смотри описание в readme.txt пункт 1.
                let keys = Object.keys(result.val());
                let values = Object.values(result.val());
                values.map((element, index) => element.key = keys[index]);
                commit('SET_LIST', values);
            })
        },
        UPDATE_ITEM({commit}, data) {
            commit('UPDATE_ITEM', data);
        },
        DELETE_ITEM({commit}, key) {
            commit('DELETE_ITEM', key);
        },
        SET_SINGLE_ITEM({commit}, key) {
            commit('SET_SINGLE_ITEM', key);
        },
        REMOVE_SINGLE_ITEM({commit}) {
            commit('REMOVE_SINGLE_ITEM');
        },
        CREATE_ITEM({commit}, item) {
            commit('CREATE_ITEM', item);
        }
    }
});

export default store;