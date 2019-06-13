import QueryServiceV3 from '@/services/QueryDaskService.js'
export const state = {
    error: null
}

export const mutations = {
    SET_ERROR(state, error){
        state.error = error;
    },
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
    }
}