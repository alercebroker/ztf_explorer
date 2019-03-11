import QueryService from '@/services/QueryService.js';
import QueryServiceV3 from '@/services/QueryServiceV3.js'
import Vue from 'vue';
export const state = {
    filters: {},
    dates: {},
    bands: {},
    coordinates: {},
    sql: "SELECT * FROM OBJECTS",
    interval: null,
    flagFirst: false,
    flagLast: false,
    query_status: 0,
    error: null,
    file: null,
    classes: [
        {
            text: "Not specified",
            value: null
        },
        {
            text: "Classified",
            value: "classified"
        },
        {
            text: "Not classified",
            value: "not classified"
        }
    ],
    classifiers: [
        {
            text: "All",
            value: null
        },
        {
            text: "X-MATCH",
            value: "classxmatch"
        },
        {
            text: "ML_RF",
            value: "classrf"
        },
        {
            text:"ML_RNN",
            value:"classrnn"
        }
    ],
    selectedClassifier: null,
    selectedClass: null,
    probability: null,
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
        if(payload.value != null)
            Vue.set(obj, payload.keyPath[lastKeyIndex], payload.value);
        else Vue.delete(obj, payload.keyPath[lastKeyIndex]);
        
    },
    SET_SQL(state, sql){
        state.sql = sql;
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
        state.probability = null
        state.selectedClass = null
        state.selectedClassifier = null
    },
    SET_CLASSES(state, classes){
        classes.push(classes.shift());
        classes.map(option => {
            state.classes.push({
                text: option.name,
                value: option.id
            })
        })
    },
    SET_CLASSIFIER(state, classifier){
        state.selectedClassifier = classifier;
    },
    SET_CLASS(state, classs){
        state.selectedClass = classs;
    },
    SET_PROBABILITY(state, probability){
        state.probability = probability;
    },
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
    checkQueryStatus({commit, dispatch}, taskId){
        return QueryService.checkQueryStatus(taskId).then(response => {
            if (response.data.status === "SUCCESS") {
                commit('SET_ERROR', null);
                return "SUCCESS"
            }
            else if (response.data.status === "TIMEDOUT"){
                commit('SET_QUERY_STATUS', 504)
                dispatch('loading', false)
            }
            else if( response.data.status === "STARTED"){
                return dispatch('checkQueryStatus', taskId)
            }
        }).catch(error => {
            commit('SET_ERROR', error);
            return "ERROR"
        })
    },
    queryObjects({ commit, dispatch, state }, query_parameters){
        dispatch('loading', true);
        QueryService.executeQuery(query_parameters).then( response => {
            let taskId = response.data["task-id"]
            dispatch('checkQueryStatus', taskId).then(result => {
                if(result === "SUCCESS"){
                    dispatch('getResults',taskId);
                }
            })
        }).catch(error => {
            commit('SET_ERROR', error);
            dispatch('loading', false);
        })
    },
    getResults({commit, dispatch},taskId){
        QueryService.getResult(taskId).then(result => {
            if(result.data.result.length === 0) commit('SET_QUERY_STATUS', 204);
            else{
                commit('SET_QUERY_STATUS', result.status);
                dispatch('setObjects',result.data.result);
                // dispatch('setPlot', result.data.plot)
            }
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
            dispatch('checkQueryStatus',taskId).then(result => {
                if(result === "SUCCESS"){
                    dispatch('getObjectDetails',taskId);
                }
            })
        }).catch(error => {
            commit('SET_ERROR', error);
            dispatch('loading', false);
        })
    },
    queryAlertsFromURL({commit, dispatch}, object){
        dispatch('loading', true);
        QueryService.executeObjectQuery(object.oid).then( response => {
            let taskId = response.data["task-id"]
            dispatch('checkQueryStatus',taskId).then(result => {
                if(result === "SUCCESS"){
                    dispatch('getObjectDetails',taskId);
                }
            })
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
            dispatch('checkQueryStatus',taskId).then(result => {
                if(result === "SUCCESS"){
                    dispatch('getFile',taskId);
                }
            })
        }).catch(error => {
            commit('SET_ERROR', error);
        })
    },
    queryClassList({commit, dispatch}){
        QueryService.queryClassList().then( res => {
            let taskId = res.data["task-id"];
            dispatch('checkQueryStatus',taskId).then( result => {
                console.log("status", result)
                if(result === "SUCCESS"){
                    dispatch('getClassList', taskId);
                }
            })
        }).catch( error => {
            commit('SET_ERROR', error);
        });
    },
    
    getClassList({commit},taskId){
        QueryService.getClassList(taskId).then(result => {
            commit('SET_CLASSES',result.data.result);
        }).catch(error => {
            commit('SET_ERROR', error);
        })
    },
    setClassifier({commit, state, dispatch}, classifier){
        let oldVal = state.selectedClassifier
        commit('SET_CLASSIFIER', classifier);
        if(state.selectedClass >= 0 && state.selectedClassifier){
            dispatch('updateOptions',{
                obj: "filters",
                keyPath: [oldVal],
                value: null
            })
            dispatch('updateOptions',{
                obj: "filters",
                keyPath: ['p' + oldVal],
                value: null
            })
            if(state.selectedClassifier != 'classxmatch' && state.probability){
                dispatch('updateOptions',{
                    obj: "filters",
                    keyPath: ['p' + state.selectedClassifier],
                    value: state.probability
                })
            }
            dispatch('updateOptions',{
                obj: "filters",
                keyPath: [state.selectedClassifier],
                value: state.selectedClass
            })
        }
        else{
            dispatch('updateOptions',{
                obj: "filters",
                keyPath: [oldVal],
                value: null
            })
            dispatch('updateOptions',{
                obj: "filters",
                keyPath: [classifier],
                value: null
            })
            dispatch('updateOptions',{
                obj: "filters",
                keyPath: [classifier],
                value: null
            })
            dispatch('updateOptions',{
                obj: "filters",
                keyPath: ['p'+oldVal],
                value: null
            })
        }
    },
    setClass({commit, state, dispatch}, classs){
        commit('SET_CLASS', classs);
        if(state.selectedClassifier){
            dispatch('updateOptions',{
                obj: "filters",
                keyPath: [state.selectedClassifier],
                value: classs
            })
        }
        if(classs == null){
            dispatch('setProbability', null)
        }
    },
    setProbability({commit, dispatch, state}, probability){
        commit('SET_PROBABILITY', probability);
        dispatch('updateOptions',{
            obj: "filters",
            keyPath: ['p'+state.selectedClassifier],
            value: probability
        })
    },
    getSpatialDistribution({dispatch}){
        return QueryServiceV3.getSpatialDistribution().then(response => {
            dispatch('setSpatialDistribution', response.data);
            return response.data;
        });
    },
    queryObjectsV3({dispatch}){
        return QueryServiceV3.queryObjectsV3().then( response => {
            dispatch('setObjects', response.data);
        })
    }
}

export const getters = {
    getFilters(state){
        return state.filters
    },
    getSQL(state){
        return state.sql
    }
}

