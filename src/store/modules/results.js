export const state = {
    selectedObject: {
        oid: null,
    },
    objectDetails: {
        object_details: null,
        alerts: null,
    },
    selectedColumnOptions: [
        {
            key: "oid",
            sortable: false,
            label: "Object ID"
        },
        {
            key: "nobs",
            sortable: true,
            label: "#obs"
        },
        {
            key: "radec",
            label: "RA/Dec"
        },
        {
            key: "classxmatch",
            label: "X-MATCH"
        },
        {
            key: "classrf",
            label: "ML_RF"
        },
        {   
            key: "pclassrf",
            sortable: true,
            label: "P(RF)",
        },
        {
            key: "lastmjd",
            sortable: true,
            label: "LastMJD"
        }
    ],
    spatialDistribution: null,
    overviewHistogram: null,
    queryHistogram: null,
    overviewScatter: null,
    queryScatter: null,
    objects: [],
    total: 0,
    num_pages: 0,
    class_counts: null,
}

export const mutations = {
    SET_SELECTED_COLUMN_OPTIONS(state, selected){
        state.selectedColumnOptions = selected
    },
    SET_SELECTED_OBJECT(state, item){
        state.selectedObject = item;
    },
    SET_OBJECT_DETAILS(state, details){
        state.objectDetails = details;
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
    SET_OBJECTS(state, objects){
        state.objects = objects;
    },
    SET_NUM_PAGES(state,num_pages){
        state.num_pages = num_pages;
    },
    SET_TOTAL(state, total){
        state.total = total;
    },
    SET_CLASS_COUNTS(state, data){
        state.class_counts = data;
    }
}

export const actions = {
    setSelectedColumnOptions({commit}, selected){
        commit('SET_SELECTED_COLUMN_OPTIONS', selected);
    },
    objectSelected({commit, dispatch, state}, object){
        if(state.selectedObject.oid !== object.oid){
            commit('SET_SELECTED_OBJECT', object);
            commit('SET_OBJECT_DETAILS', {
                object_details: null,
                alerts: null,
            });
            dispatch('queryAlerts', object);
        }
    },
    objectSelectedFromURL({commit, dispatch, state}, object){
        if(state.selectedObject.oid !== object.oid){
            commit('SET_SELECTED_OBJECT', object);
            dispatch('queryAlertsFromURL', object);
        }
    },
    setObjectDetails({commit}, details){
        commit('SET_OBJECT_DETAILS', details.result);
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
    setObjects({commit}, objects){
        commit('SET_OBJECTS', JSON.parse(objects.result));
        commit('SET_TOTAL', objects.total);
        commit('SET_NUM_PAGES', objects.num_pages)
    },
    setClassCounts({commit}, data){
        commit('SET_CLASS_COUNTS', data);
    },
}

export const getters = {

}
