export const state = {
    selectedObject: {
        oid: null
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
            label: "# Obs"
        },
        {
            key: "pclass",
            sortable: false,
            label: "Probability on class"
        }
    ]
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
    }
}

export const actions = {
    setSelectedColumnOptions({commit}, selected){
        commit('SET_SELECTED_COLUMN_OPTIONS', selected);
    },
    objectSelected({commit, dispatch, state}, object){
        if(state.selectedObject.oid !== object.oid){
            commit('SET_SELECTED_OBJECT', object);
            dispatch('queryAlerts', object);
        }
    },
    setObjectDetails({commit}, details){
        commit('SET_OBJECT_DETAILS', details.result);
    }
}

export const getters = {

}