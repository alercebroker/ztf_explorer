import Vue from 'vue';
import Vuex from 'vuex';
import * as search from './modules/search.js';
import * as results from './modules/results.js';
import * as plots from './modules/plots.js'
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        search,
        results,
        plots
    },
    state: {
        loading: false,
        downloading: false,
        selectedTab: 0,
        perPage: 20,
        loadingPlot: false,
        loadingScatterPlot: false,
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
        },
        SET_LOADING_PLOT(state,value){
            state.loadingPlot = value;
        },
        SET_LOADING_SCATTERPLOT(state,value){
            state.loadingScatterPlot = value;
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
        },
        loadingPlot({commit}, value){
            commit('SET_LOADING_PLOT', value);
        },
        loadingScatterPlot({commit}, value){
            commit('SET_LOADING_SCATTERPLOT', value);
        }
    },
    getters: {
        
    }
})