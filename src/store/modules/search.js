import QueryService from '@/services/QueryService.js';
import Vue from 'vue';
import _ from 'lodash';
export const state = {
    filters: {},
    dates: {},
    bands: {},
    coordinates: {},
    sql: "SELECT * FROM OBJECTS",
    objects: null,
    interval: null,
    flagFirst: false,
    flagLast: false,
}

export const mutations = {
    /**
     * Updates the query parameters
     * @param {*} state: this state
     * @param {*} payload: an object wich contains the attribute that we want to update
     * payload: {
     *  obj: The main attribute we want to update (filters, dates, bands or coordinates) as string
     *  keyPath: an array with the nested attributes inside obj, for example: ["period", "min"] wich means filters.period.min
     *  value: the value to update
     * }
     */
    UPDATE_OPTIONS(state, payload){
        let obj = state[payload.obj];
        let lastKeyIndex = payload.keyPath.length - 1;
        for (var i = 0; i < lastKeyIndex; ++i) {
            let key = payload.keyPath[i];
            if (!(key in obj))
                obj[key] = {}
            obj = obj[key];
        }
        if(payload.value)
            Vue.set(obj, payload.keyPath[lastKeyIndex], payload.value);
        else Vue.delete(obj, payload.keyPath[lastKeyIndex]);
        
    },
    SET_SQL(state, sql){
        state.sql = sql;
    },
    SET_OBJECTS(state, objects){
        state.objects = objects;
    },
    SET_FLAG(state, payload){
        state[payload.flag] = payload.value;
    }
}

export const actions = {
    updateOptions({ commit }, payload) {
        commit('UPDATE_OPTIONS', payload);
    },
    getSQL({ commit, state }, query_parameters){
        QueryService.getSQL(query_parameters).then( response => {
            commit('SET_SQL', response.data);
        }).catch( error => {
            alert(error);
        })
    },
    queryObjects({ commit, dispatch, state }, query_parameters){
        QueryService.executeQuery(query_parameters).then( response => {
            let taskId = response.data["task-id"]
            state.interval = setInterval( () => {
                QueryService.checkQueryStatus(taskId).then(response => {
                    if (response.data.status === "SUCCESS") {
                        clearInterval(state.interval);
                        dispatch('getResults',taskId);
                    }
                }).catch(error => {
                    alert(error);
                })
            },500);
        }).catch(error => {
            alert(error);
        })
    },
    getResults({commit},taskId){
        QueryService.getPaginatedResult(taskId, 10, 1).then(result => {
            commit('SET_OBJECTS',result.data)
        }).catch(error => {
            alert(error);
        })
    },
    updateFlag({commit}, payload){
        commit('SET_FLAG', payload);
    }
}

export const getters = {
    getFilters(state){
        return state.filters
    },
    getObjects(state){
        return state.objects
    },
    getSQL(state){
        return state.sql
    },
    query_parameters(state){
        let query_parameters = {};
        if (Object.keys(state.filters).length) query_parameters.filters = state.filters
        if (Object.keys(state.bands).length) query_parameters.bands = state.bands
        if (Object.keys(state.dates).length) query_parameters.dates = state.dates
        if (Object.keys(state.coordinates).length) query_parameters.coordinates = state.coordinates
        return Object.keys(state.filters).length;
    }
}

