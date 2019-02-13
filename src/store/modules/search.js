import QueryService from '@/services/QueryService.js';
import Vue from 'vue';
export const state = {
    filters: {},
    dates: {},
    bands: {},
    coordinates: {},
    sql: "SELECT * FROM OBJECTS",
    objects: [],
    interval: null,
    flagFirst: false,
    flagLast: false,
    query_status: 0,
    error: null,
    file: null
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
    },
    SET_QUERY_STATUS(state, value){
        state.query_status = value;
    },
    SET_ERROR(state, error){
        state.error = error;
    },
    SET_FILE(state, file){
        state.file = file;
    },
    CLEAR_QUERY(state){
        state.filters = { }
        state.dates = { }
        state.bands = { }
        state.coordinates = { }
        state.sql = "SELECT * FROM OBJECTS"
    }
}

export const actions = {
    updateOptions({ commit }, payload) {
        commit('UPDATE_OPTIONS', payload);
    },
    getSQL({ commit }, query_parameters){
        QueryService.getSQL(query_parameters).then( response => {
            commit('SET_SQL', response.data);
        }).catch( error => {
            commit('SET_ERROR', error);
        })
    },
    queryObjects({ commit, dispatch, state }, query_parameters){
        dispatch('loading', true);
        QueryService.executeQuery(query_parameters).then( response => {
            let taskId = response.data["task-id"]
            state.interval = setInterval( () => {
                QueryService.checkQueryStatus(taskId).then(response => {
                    if (response.data.status === "SUCCESS") {
                        clearInterval(state.interval);
                        commit('SET_QUERY_STATUS', 200);
                        dispatch('getResults',taskId);
                    }
                    else if (response.data.status === "TIMEDOUT"){
                        clearInterval(state.interval);
                        commit('SET_QUERY_STATUS', 504);
                        dispatch('loading', false);
                    }
                }).catch(error => {
                    commit('SET_ERROR', error);
                    dispatch('loading', false);
                })
            },500);
        }).catch(error => {
            commit('SET_ERROR', error);
            dispatch('loading', false);
        })
    },
    getResults({commit, dispatch},taskId){
        QueryService.getResult(taskId).then(result => {
            commit('SET_QUERY_STATUS', result.status);
            commit('SET_OBJECTS',result.data.result);
            dispatch('loading', false);
        }).catch(error => {
            commit('SET_ERROR', error);
            dispatch('loading', false);
        })
    },
    queryAlerts({commit, dispatch}, object){
        dispatch('loading', true);
        QueryService.executeObjectQuery(object.oid).then( response => {
            let taskId = response.data["task-id"]
            state.interval = setInterval(() => {
                QueryService.checkQueryStatus(taskId).then(response => {
                    if (response.data.status === "SUCCESS") {
                        clearInterval(state.interval);
                        //commit('SET_QUERY_STATUS', 200);
                        dispatch('getObjectDetails', taskId);
                    }
                    else if (response.data.status === "TIMEDOUT") {
                        clearInterval(state.interval);
                        commit('SET_QUERY_STATUS', 504);
                        dispatch('loading', false);
                    }
                }).catch(error => {
                    commit('SET_ERROR', error);
                    dispatch('loading', false);
                })
            }, 500);
        }).catch(error => {
            commit('SET_ERROR', error);
            dispatch('loading', false);
        })
    },
    queryAlertsFromURL({commit, dispatch}, object){
        dispatch('loading', true);
        QueryService.executeObjectQuery(object.oid).then( response => {
            let taskId = response.data["task-id"]
            state.interval = setInterval(() => {
                QueryService.checkQueryStatus(taskId).then(response => {
                    if (response.data.status === "SUCCESS") {
                        clearInterval(state.interval);
                        commit('SET_QUERY_STATUS', 200);
                        dispatch('getObjectDetails', taskId);
                    }
                    else if (response.data.status === "TIMEDOUT") {
                        clearInterval(state.interval);
                        commit('SET_QUERY_STATUS', 504);
                        dispatch('loading', false);
                    }
                }).catch(error => {
                    commit('SET_ERROR', error);
                    dispatch('loading', false);
                })
            }, 500);
        }).catch(error => {
            commit('SET_ERROR', error);
            dispatch('loading', false);
        })
    },
    getObjectDetails({commit, dispatch}, taskId){
        QueryService.getResult(taskId).then( response => {
            dispatch('setObjectDetails', response.data);
            dispatch('loading', false);
        }).catch(error => {
            commit('SET_ERROR', error);
            dispatch('loading', false);
        })
    },
    updateFlag({commit}, payload){
        commit('SET_FLAG', payload);
    },
    clearQuery({commit}){
        commit('CLEAR_QUERY');
    },
    getFile({commit},taskId){
        QueryService.getResult(taskId).then(result => {
            commit('SET_QUERY_STATUS', result.status);
            commit('SET_FILE', result.data.result);
        }).catch(error => {
            commit('SET_ERROR', error);
        })
    },
    downloadFile({commit, dispatch, state}, format){
        let query_parameters = {
            filters: state.filters,
        }
        if(!Object.getOwnPropertyNames(state.bands).length === 0){
            query_parameters.bands = state.bands;
        }
        if(!Object.getOwnPropertyNames(state.dates).length === 0){
            query_parameters.dates = state.dates;
        }
        if(!Object.getOwnPropertyNames(state.coordinates).length === 0){
            query_parameters.coordinates = state.coordinates;
        }
        QueryService.executeDownloadQuery(query_parameters, format).then( response => {
            let taskId = response.data["task-id"];
            state.interval = setInterval(() => {
                QueryService.checkQueryStatus(taskId).then(response => {
                    if (response.data.status === "SUCCESS") {
                        clearInterval(state.interval);
                        commit('SET_QUERY_STATUS', 200);
                        dispatch('getFile',taskId);
                    }
                    else if (response.data.status === "TIMEDOUT") {
                        clearInterval(state.interval);
                    }
                }).catch(error => {
                    commit('SET_ERROR', error);
                })
            }, 500);
        }).catch(error => {
            commit('SET_ERROR', error);
        })
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
    }
}

