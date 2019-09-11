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
        selectedTab: 0,
        perPage: 20,
        tableLoading: false,
        tutorialOpen: false,
    },
    mutations: {
        SET_SELECTED_TAB(state, value) {
            state.selectedTab = value;
        },
        SET_TABLE_LOADING(state, val) {
            state.tableLoading = val;
        },
        SET_TUTORIAL_OPEN(state, value) {
            state.tutorialOpen = value;
        }

    },
    actions: {

        setSelectedTab({ commit }, value) {
            commit('SET_SELECTED_TAB', value);
        },
        setTableLoading({ commit }, value) {
            commit('SET_TABLE_LOADING', value)
        },
        setTutorialOpen({ commit }, value) {
            commit('SET_TUTORIAL_OPEN', value);
        }

    },
    getters: {

    }
})