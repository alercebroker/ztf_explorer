import Vue from 'vue';
import Vuex from 'vuex';
import * as search from './modules/search.js';
import * as results from './modules/results.js';
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        search,
        results
    },
    state: {
        loading: false,
        downloading: false,
    },
    mutations: {
        SET_LOADING(state, value) {
            state.loading = value;
        },
        SET_DOWNLOADING(state, value){
            state.downloading = value;
        }
    },
    actions: {
        loading({ commit }, value) {
            commit('SET_LOADING', value);
        },
        downloading({commit}, value){
            commit('SET_DOWNLOADING', value);
        }
    },
    getters: {
        
    }
})