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
            label: "#"
        },
        {
            key: "coordinates",
            label: "Coordinates"
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
            key: "classrnn",
            label: "ML_RNN"
        },
        {
            key: "pclassrnn",
            sortable: true,
            label: "P(RNN)"
        },
        /*{
            key: "meanra",
            sortable: false,
            label: "RA"
        },
	    {
            key: "meandec",
            sortable: false,
            label: "Dec"
        },
	    {
            key: "firstjd",
            sortable: true,
            label: "FirstMJD"
        },*/
	    {
            key: "lastjd",
            sortable: true,
            label: "LastMJD"
        },
	    /*{
            key: "ming",
            sortable: true,
            label: "ming"
        },
	    {
            key: "minr",
            sortable: true,
            label: "minr"
        }*/
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
    }
}

export const getters = {

}
