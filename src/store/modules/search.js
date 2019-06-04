import QueryService from '@/services/QueryService.js';
import QueryServiceV3 from '@/services/QueryServiceV3.js'
import Vue from 'vue';
export const state = {
    query_parameters: null,
    filters: {},
    dates: {},
    bands: {},
    coordinates: {},
    sql: "self.objects",
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
        },
        {
            text: "Ceph",
            value: 1
        },
        {
            text: "DSCT",
            value: 2
        },
        {
            text: "EB",
            value:3
        },
        {
            text: "LPV",
            value: 4
        },
        {
            text: "RRL",
            value:5
        },
        {
            text: "Sne",
            value: 6
        },
        {
            text: "Other",
            value: 0
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
    SET_QUERY_PARAMETERS(state, query_parameters){
        state.query_parameters = query_parameters;
    },
    SET_SQL(state, sql){
        state.sql = sql;
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
        state.sql = "self.objects"
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
    setQueryParameters({ commit }, query_parameters){
        commit('SET_QUERY_PARAMETERS', query_parameters);
    },
    getSQL({ commit }, query_parameters){
        QueryServiceV3.getDataframeFilters(query_parameters).then( response => {
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
    checkQueryStatusV3({commit, dispatch}, queryId){
        return QueryServiceV3.queryStatus(queryId).then(response => {
            if (response.data.status === "finished"){
                commit('SET_ERROR', null);
                return "finished"
            }
            else if(response.data.status === "error"){
                commit('SET_ERROR', "error")
                return "error"
            }
            else if(response.data.status === "pending"){
                return dispatch('checkQueryStatusV3', queryId)
            }
        }).catch(error => {
            commit('SET_ERROR', error)
            return "error"
        })
    },
    queryObjectsV3({ commit, dispatch }, payload){
        dispatch('loading', true);
        QueryServiceV3.queryObjects(payload.query_parameters).then( response => {
            let queryId = response.data["query-id"]
            dispatch('checkQueryStatusV3', queryId).then(result => {
                if(result === "finished"){
                    let newPayload = {
                        queryId: queryId,
                        page: payload.page,
                        perPage: payload.perPage
                    }
                    dispatch('getPaginatedResult',newPayload);
                }
            })
        }).catch(error => {
            commit('SET_ERROR', error);
            dispatch('loading', false);
        })
    },
    getPaginatedResult({commit, dispatch},payload){
        QueryServiceV3.paginatedResult(payload.queryId, payload.page, payload.perPage).then( response =>{
            if(response.data.total === 0) commit('SET_QUERY_STATUS', 204);
            else{
                commit('SET_QUERY_STATUS', response.status);
                dispatch('setObjects',response.data);
            }
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
            console.log("res ? ")
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
        dispatch('setProbability', null);
        commit('SET_CLASSIFIER', classifier);
        dispatch('updateOptions',{
            obj: "filters",
            keyPath: ["classxmatch"],
            value: null
        })
        dispatch('updateOptions',{
            obj: "filters",
            keyPath: ["classrf"],
            value: null
        })
        dispatch('updateOptions',{
            obj: "filters",
            keyPath: ["classrnn"],
            value: null
        })
        if(state.selectedClass && classifier){
            dispatch('updateOptions',{
                obj: "filters",
                keyPath: [classifier],
                value: state.selectedClass
            })
        }
        if(state.selectedClass && !classifier){
            dispatch('updateOptions',{
                obj: "filters",
                keyPath: ["classxmatch"],
                value: state.selectedClass
            })
            dispatch('updateOptions',{
                obj: "filters",
                keyPath: ["classrnn"],
                value: state.selectedClass
            })
            dispatch('updateOptions',{
                obj: "filters",
                keyPath: ["classrf"],
                value: state.selectedClass
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
        else{
            dispatch('updateOptions',{
                obj: "filters",
                keyPath: ["classxmatch"],
                value: classs
            })
            dispatch('updateOptions',{
                obj: "filters",
                keyPath: ["classrf"],
                value: classs
            })
            dispatch('updateOptions',{
                obj: "filters",
                keyPath: ["classrnn"],
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
    
}

