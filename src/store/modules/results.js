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
            value: "oid",
            sortable: false,
            text: "Object ID",
            show: true,
        },
        {
            value: "nobs",
            sortable: false,
            text: "Observations",
            show: true,
        },
        {
            value: "firstmjd",
            text: "FirstMJD",
            sortable: true,
            show: true
        },
        {
            value: "lastmjd",
            sortable: true,
            text: "LastMJD",
            show: true
        },
        {
            value: "radec",
            text: "RA/Dec (degrees)",
            show: true
        },
        {
            value: "classxmatch",
            sortable: false,
            text: "Crossmatch",
            show: false
        },
        {
            value: "classrf",
            sortable: false,
            text: "Random Forest Class",
            show: false
        },
        {   
            value: "pclassrf",
            sortable: true,
            text: "Random Forest Probability",
            show: false
        },
        {
            value: "deltajd",
            text: "DeltaMJD",
            show: false
        },
        {
            value: "meandec",
            text: "Dec (degrees)",
            sortable: false,
            show: false
        },
        {
            value: "meanra",
            text: "RA (degrees)",
            sortable: false,
            show: false
        },
        {
            value: "first_magpsf_g",
            text: "FirstMagG",
            show: false
        },
        {
            value: "last_magpsf_g",
            text: "LastMagG",
            show: false
        },
        {
            value: "min_magpsf_g",
            text: "MinG",
            sortable: true,
            show: false
        },
        {
            value: "max_magpsf_g",
            text: "MaxG",
            show: false
        },
        {
            value: "mean_magpsf_g",
            text: "MeanG",
            show: false
        },
        {
            value: "median_magpsf_g",
            text: "MedianG",
            show: false
        },
        {
            value: "last_magpsf_r",
            text: "LastMagR",
            show: false
        },
        {
            value: "first_magpsf_r",
            text: "FirstMagR",
            show: false
        },
        {
            value: "min_magpsf_r",
            text: "MinR",
            sortable: true,
            show: false
        },
        {
            value: "max_magpsf_r",
            text: "MaxR",
            show: false
        },
        {
            value: "mean_magpsf_r",
            text: "MeanR",
            show: false
        },
        {
            value: "median_magpsf_r",
            text: "MedianR",
            show: false
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
