import QueryPSQLService from '@/services/QueryPSQLService.js';
import QueryXMatchService from '@/services/QueryXMatchService.js';
import Vue from 'vue';
export const state = {
    query_parameters: null,
    filters: { nobs: {} },
    dates: { firstmjd: {}},
    bands: {},
    coordinates: {},
    sql: "SELECT * FROM objects",
    query_status: 0,
    error: null,
    file: null,
    lateClasses: [
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
            value: 3
        },
        {
            text: "LPV",
            value: 4
        },
        {
            text: "RRL",
            value: 5
        },
        {
            text: "SNe",
            value: 6
        },
        {
            text: "Other",
            value: 0
        },
        {
            text: "AGN I",
            value: 7
        },
        {
            text: "Blazar",
            value: 8
        },
        {
            text: "CV/Nova",
            value: 9
        },
        {
            text: "SN Ia",
            value: 10
        },
        {
            text: "SN Ibc",
            value: 11
        },
        {
            text: "SN II",
            value: 12
        },
        {
            text: "SN IIn",
            value: 13
        },
        {
            text: "SLSN",
            value: 14
        },
        {
            text: "EB/SD/D",
            value: 15
        },
        {
            text: "EB/C",
            value: 16
        },
        {
            text: "Periodic/Other",
            value: 17
        },

    ],
    earlyClasses: [
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
            text: "AGN",
            value: 18
        },
        {
            text: "SN",
            value: 19
        },
        {
            text: "Variable Star",
            value: 20
        },
        {
            text: "Asteroid",
            value: 21
        },
        {
            text: "Bogus",
            value: 22
        }
    ],
    classifiers: [
        {
            text: "Select a classifier",
            value: null,
        },
        {
            text: "X-MATCH",
            value: "classxmatch"
        },
        {
            text: "Late Classifier",
            value: "classrf"
        },
        {
            text: "Early Classifier",
            value: "classearly"
        }
    ],
    selectedClassifier: null,
    selectedClass: null,
    probability: null,
    valid: true,
    searched: false,
    nobsRange: [0, 1000],
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
    UPDATE_OPTIONS(state, payload) {
        let obj = state[payload.obj];
        let lastKeyIndex = payload.keyPath.length - 1;
        for (var i = 0; i < lastKeyIndex; ++i) {
            let key = payload.keyPath[i];
            if (!(key in obj))
                obj[key] = {}
            obj = obj[key];
        }
        if (payload.value != null)
            Vue.set(obj, payload.keyPath[lastKeyIndex], payload.value);
        else Vue.delete(obj, payload.keyPath[lastKeyIndex]);

    },
    SET_QUERY_PARAMETERS(state, query_parameters) {
        state.query_parameters = query_parameters;
    },
    SET_SQL(state, sql) {
        state.sql = sql;
    },
    SET_FLAG(state, payload) {
        state[payload.flag] = payload.value;
    },
    SET_QUERY_STATUS(state, value) {
        state.query_status = value;
    },
    SET_ERROR(state, error) {
        state.error = error;
    },
    SET_FILE(state, file) {
        state.file = file;
    },
    CLEAR_QUERY(state) {
        state.filters = { nobs: {} }
        state.dates = { firstmjd: {}, firstGreg: {} }
        state.bands = {}
        state.coordinates = {}
        state.sql = "SELECT * FROM OBJECTS"
        state.probability = null
        state.selectedClass = null
        state.selectedClassifier = null
        state.nobsRange = [0, 1000]
    },
    SET_CLASSES(state, classes) {
        classes.push(classes.shift());
        classes.map(option => {
            state.classes.push({
                text: option.name,
                value: option.id
            })
        })
    },
    SET_CLASSIFIER(state, classifier) {
        state.selectedClassifier = classifier;
    },
    SET_CLASS(state, classs) {
        state.selectedClass = classs;
    },
    SET_PROBABILITY(state, probability) {
        state.probability = probability;
    },
    SET_VALID_SEARCH(state, value) {
        state.validSearch = value
    },
    SET_VALID_COORDS(state, value) {
        state.validCoords = value
    },
    SET_SEARCHED(state, value) {
        state.searched = value
    },
    SET_NOBS_RANGE(state, value) {
        state.nobsRange = value
    }
}

export const actions = {
    updateOptions({ commit }, payload) {
        commit('UPDATE_OPTIONS', payload);
    },
    setQueryParameters({ commit }, query_parameters) {
        commit('SET_QUERY_PARAMETERS', query_parameters);
    },
    getSQL({ commit }, query_parameters) {
        QueryPSQLService.getSQL(query_parameters).then(response => {
            commit('SET_SQL', response.data)
        })
    },
    setQueryStatus({ commit }, status) {
        commit('SET_QUERY_STATUS', status);
    },
    queryAlerts({ commit, dispatch }, object) {
        dispatch('loading', true)
        Promise.all([
            QueryPSQLService.queryDetections(object.oid),
            QueryPSQLService.queryNonDetections(object.oid),
            QueryPSQLService.queryProbabilities(object.oid),
            // QueryPSQLService.queryFeatures(object.oid),
            QueryPSQLService.queryPeriod(object.oid),
        ])
            .then(values => {
                commit('SET_QUERY_STATUS', 200);
                commit('SET_ERROR', null);
                values.forEach((element, index) => {
                    dispatch('setObjectDetails', element.data.result)
                })
                dispatch('setShowObjectDetailsModal', true)
                dispatch('loading', false)
            })
            .catch(reason => {
                console.log("Error with alert query", reason)
                commit('SET_ERROR', reason);
                dispatch('loading', false);
            })
    },
    queryObjects({ commit, dispatch, state}, payload) {
        dispatch('loading', true)
        QueryPSQLService.queryObjects(payload).then(response => {
            commit('SET_QUERY_STATUS', response.status)
            commit('SET_SEARCHED', true);
            commit('SET_ERROR', null);
            dispatch('setObjects', response.data)
            dispatch('loading', false)
        }).catch(error => {
            commit('SET_ERROR', error);
            dispatch('loading', false);
        })
    },
    queryAlertsFromURL({ commit, dispatch }, object) {
        dispatch('loading', true)
        Promise.all([
            QueryPSQLService.queryDetections(object.oid),
            QueryPSQLService.queryNonDetections(object.oid),
            QueryPSQLService.queryProbabilities(object.oid),
            // QueryPSQLService.queryFeatures(object.oid),
            QueryPSQLService.queryStats(object.oid),
            QueryPSQLService.queryPeriod(object.oid)
        ])
            .then(values => {
                commit('SET_QUERY_STATUS', 200);
                commit('SET_ERROR', null);
                values.forEach((element, index) => {
                    if (index == 3) {
                        dispatch('objectSelected', element.data.result.stats)
                    }
                    else {
                        dispatch('setObjectDetails', element.data.result)
                    }
                })
                dispatch('setShowObjectDetailsModal', true)
                dispatch('loading', false)
            })
            .catch(reason => {
                console.log("Error with alert query", reason)
                commit('SET_ERROR', reason);
                dispatch('loading', false);
            })
    },
    clearQuery({ commit }) {
        commit('CLEAR_QUERY');
    },
    getFile({ commit }, taskId) {

    },
    downloadFile({ commit, dispatch, state }, format) {
        let query_parameters = {
            filters: state.filters,
        }
        if (!Object.getOwnPropertyNames(state.bands).length === 0) {
            query_parameters.bands = state.bands;
        }
        if (!Object.getOwnPropertyNames(state.dates).length === 0) {
            query_parameters.dates = state.dates;
        }
        if (!Object.getOwnPropertyNames(state.coordinates).length === 0) {
            query_parameters.coordinates = state.coordinates;
        }

    },

    setClassifier({ commit, state, dispatch }, classifier) {
        dispatch('setProbability', null);
        commit('SET_CLASSIFIER', classifier);
        dispatch('updateOptions', {
            obj: "filters",
            keyPath: ["classxmatch"],
            value: null
        })
        dispatch('updateOptions', {
            obj: "filters",
            keyPath: ["classrf"],
            value: null
        })
        if (state.selectedClass && classifier) {
            dispatch('updateOptions', {
                obj: "filters",
                keyPath: [classifier],
                value: state.selectedClass
            })
        }
        if (state.selectedClass && !classifier) {
            dispatch('updateOptions', {
                obj: "filters",
                keyPath: ["classxmatch"],
                value: state.selectedClass
            })
            dispatch('updateOptions', {
                obj: "filters",
                keyPath: ["classrf"],
                value: state.selectedClass
            })
        }
    },
    setClass({ commit, state, dispatch }, classs) {
        commit('SET_CLASS', classs);
        if (state.selectedClassifier) {
            dispatch('updateOptions', {
                obj: "filters",
                keyPath: [state.selectedClassifier],
                value: classs
            })
        }
        else {
            dispatch('updateOptions', {
                obj: "filters",
                keyPath: ["classxmatch"],
                value: classs
            })
            dispatch('updateOptions', {
                obj: "filters",
                keyPath: ["classrf"],
                value: classs
            })
        }
        if (classs == null) {
            dispatch('setProbability', null)
        }
    },
    setProbability({ commit, dispatch, state }, probability) {
        commit('SET_PROBABILITY', probability);
        dispatch('updateOptions', {
            obj: "filters",
            keyPath: ['p' + state.selectedClassifier],
            value: probability
        })
    },
    setValidCoords({ commit }, value) {
        commit('SET_VALID_COORDS', value)
    },
    setNobsRange({ commit, dispatch }, range) {
        commit('SET_NOBS_RANGE', range)
        dispatch('updateOptions', {
            obj: "filters",
            keyPath: ["nobs", "min"],
            value: range[0]
        });
        dispatch('updateOptions', {
            obj: "filters",
            keyPath: ["nobs", "max"],
            value: range[1]
        });
    },
    getRecentObjects({dispatch}, payload){
        QueryPSQLService.queryRecentObjects(payload.mjd, payload.hours).then(response => {
            dispatch('setRecentObjects', response.data.result.count);
        })
    },
    getRecentAlerts({dispatch}, payload){
        QueryPSQLService.queryRecentAlerts(payload.mjd, payload.hours).then(response => {
            dispatch('setRecentAlerts', response.data.result.count);
        })
    },
    getClassifiedCounts({dispatch}){
        QueryPSQLService.queryClassifiedObjects().then( response => {
            dispatch('setXmatchedCount', response.data.result.xmatch);
            dispatch('setRfCount', response.data.result.rf);
            dispatch('setEarlyCount', response.data.result.early);
        })
    },
    getXMatches({dispatch}, payload){
        dispatch("nullXMatches", true);
        QueryXMatchService.xmatchall(payload)
        .then(response => {
            dispatch('setXMatches', response);
        })
        .catch(reason => {
            dispatch("setXMatchesMsg", "Error with xmatches query: " + reason)
        })
       
    }
}

