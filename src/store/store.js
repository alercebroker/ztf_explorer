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
        selectedTab: 2,
        perPage: 20
    },
    mutations: {
        SET_LOADING(state, value) {
            state.loading = value;
        },
        SET_DOWNLOADING(state, value){
            state.downloading = value;
        },
        SET_SELECTED_TAB(state,value){
            state.selectedTab = value;
        }
    },
    actions: {
        loading({ commit }, value) {
            commit('SET_LOADING', value);
        },
        downloading({commit}, value){
            commit('SET_DOWNLOADING', value);
        },
        setSelectedTab({commit}, value){
            commit('SET_SELECTED_TAB', value);
        }
    },
    getters: {
        
    }
})