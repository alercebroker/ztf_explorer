export const state = {
    error: null,
    spatialDistribution: null,
    overviewHistogram: null,
    queryHistogram: null,
    overviewScatter: null,
    queryScatter: null,
    class_counts: null,
}

export const mutations = {
    SET_ERROR(state, error){
        state.error = error;
    },
    SET_SPATIAL_DISTRIBUTION(state, plot){
        state.spatialDistribution = plot;
    },
    SET_OVERVIEW_HISTOGRAM(state,plot){
        state.overviewHistogram = plot;
    },
    SET_QUERY_HISTOGRAM(state,plot){
        state.queryHistogram = plot;
    },
    SET_OVERVIEW_SCATTER(state,plot){
        state.overviewScatter = plot;
    },
    SET_QUERY_SCATTER(state, plot){
        state.queryScatter = plot;
    },
    SET_CLASS_COUNTS(state, data){
        state.class_counts = data;
    }
}

export const actions = {
    getSpatialDistribution({dispatch}){
        return QueryServiceV3.getSpatialDistribution().then(response => {
            dispatch('setSpatialDistribution', response.data);
        });
    },
    queryHistogram({dispatch, commit}, payload){
        dispatch('loadingPlot', true);
        QueryServiceV3.queryObjects(payload.query_parameters).then( response => {
            let queryId = response.data["query-id"]
            dispatch('checkQueryStatusV3', queryId).then(result => {
                if(result === "finished"){
                    let newPayload = {
                        "query-id": queryId,
                        "x-axis": payload.xAxis,
                        "type": payload.type
                    }
                    dispatch('getQueryHistogram',newPayload);
                }
            })
        }).catch(error => {
            commit('SET_ERROR', error);
            dispatch('loading', false);
        })
    },
    getQueryHistogram({dispatch, state}, payload){
        return QueryServiceV3.getQueryHistogram(payload).then(response => {
            if(payload.type == "query") dispatch('setQueryHistogram', response.data);
            else dispatch('setOverviewHistogram', response.data);
            dispatch('loadingPlot', false);
        })
    },
    queryScatter({dispatch, commit}, payload){
        dispatch('loadingScatterPlot', true);
        QueryServiceV3.queryObjects(payload.query_parameters).then( response => {
            let queryId = response.data["query-id"]
            dispatch('checkQueryStatusV3', queryId).then(result => {
                if(result === "finished"){
                    let newPayload = {
                        "query-id": queryId,
                        "x-axis": payload.xAxis,
                        "y-axis": payload.yAxis,
                        "class": payload.classs,
                        "classifier": payload.classifier,
                        "type": payload.type
                    }
                    dispatch('getQueryScatter',newPayload);
                }
            })
        }).catch(error => {
            commit('SET_ERROR', error);
            dispatch('loading', false);
        })
    },
    getQueryScatter({ dispatch, state }, payload){
        return QueryServiceV3.getQueryScatter(payload).then(response => {
            if (payload.type == "query") dispatch('setQueryScatter', response.data);
            else dispatch('setOverviewScatter', response.data)
            dispatch('loadingScatterPlot', false);
        })
    },

    getClassCounts({dispatch}){
        return QueryServiceV3.countClass().then(response => {
            dispatch('setClassCounts', response.data);
        });
    },
    setSpatialDistribution({commit}, plot){
        commit('SET_SPATIAL_DISTRIBUTION', plot);
    },
    setOverviewHistogram({commit}, plot){
        commit('SET_OVERVIEW_HISTOGRAM', plot);
    },
    setQueryHistogram({ commit }, plot){
        commit('SET_QUERY_HISTOGRAM', plot);
    },
    setOverviewScatter({commit}, plot){
        commit('SET_OVERVIEW_SCATTER', plot);
    },
    setQueryScatter({ commit }, plot){
        commit('SET_QUERY_SCATTER', plot);
    },
    setClassCounts({commit}, data){
        commit('SET_CLASS_COUNTS', data);
    },
}
