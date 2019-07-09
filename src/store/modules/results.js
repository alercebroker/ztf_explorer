export const state = {
    selectedObject: {
        oid: null,
    },
    objectDetails: {
        detections: null,
        non_detections: null,
        probabilities: null,
        period: null
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
    
    objects: [],
    total: 0,
    num_pages: 0,
    showObjectDetailsModal: false,
    currentPage: 0,
}

export const mutations = {
    SET_SELECTED_OBJECT(state, item){
        state.selectedObject = item;
    },
    SET_OBJECT_DETAILS(state, detail){
        state.objectDetails[Object.keys(detail)[0]] = detail[Object.keys(detail)[0]]
    },
    SET_DETECTIONS(state, det){
        state.objectDetails.detections = det
    },
    SET_NON_DETECTIONS(state,nondet){
        state.objectDetails.non_detections = nondet
    },
    SET_PROBABILITIES(state, prob){
        state.objectDetails.probabilities = prob
    },
    SET_PERIODS(state, periods){
        state.objectDetails.periods = periods
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
    SET_SHOW_OBJECT_DETAILS_MODAL(state, value){
        state.showObjectDetailsModal = value
    },
    SET_CURRENT_PAGE(state, value){
        state.currentPage = value;
    },
    SET_SELECTED_COLUMN_OPTIONS(state, selected){
        state.selectedColumnOptions = selected
    }
}

export const actions = {
    objectSelected({commit, dispatch, state}, object){
        if(state.selectedObject && state.selectedObject.oid !== object.oid){
            dispatch('queryAlerts', object)
        }
        else{
            commit('SET_SHOW_OBJECT_DETAILS_MODAL', true)
        }
        commit('SET_SELECTED_OBJECT', object);
    },
    objectSelectedFromURL({commit, dispatch, state}, object){
        if(state.selectedObject.oid !== object.oid){
            commit('SET_SELECTED_OBJECT', object);
            dispatch('queryAlertsFromURL', object);
        }
    },
    setObjectDetails({commit}, detail){
        commit("SET_OBJECT_DETAILS", detail)
    },
    setDetections({commit}, detections){
        commit('SET_DETECTIONS', detections)
    },
    setNonDetections({commit}, nondetections){
        commit('SET_NON_DETECTIONS', nondetections)
    },
    setProbabilities({commit}, probabilities){
        commit('SET_PROBABILITIES', probabilities)
    },
    setPeriods({commit}, periods){
        commit('SET_PERIODS', periods)
    },
    setObjects({commit}, objects){
        commit('SET_OBJECTS', objects.result);
        commit('SET_TOTAL', objects.total);
        commit('SET_NUM_PAGES', objects.num_pages)
    },
    setShowObjectDetailsModal({commit}, value){
        commit('SET_SHOW_OBJECT_DETAILS_MODAL', value)
    },
    setCurrentPage({commit}, value){
        commit('SET_CURRENT_PAGE', value);
    },
    setSelectedColumnOptions({commit}, selected){
        commit('SET_SELECTED_COLUMN_OPTIONS', selected)
    }
    
}

export const getters = {

}
