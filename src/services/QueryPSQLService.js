import axios from 'axios'

const apiClient = axios.create({
    baseURL: process.env.VUE_APP_PSQL_API,
    withCredentials: false,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
});

export default {
    /**
     * Gets an SQL string containing the query given selected parameters
     * @param {*} queryParameters: formatted query parameters
     */
    getSQL(queryParameters) {
        return apiClient.post('/get_sql', { query_parameters: queryParameters });
    },
    /**
     * Executes query to search objects given selected parameters
     * @param {*} queryParameters: formatted query parameters
     */
    queryObjects(payload) {
        return apiClient.post('/query', payload);
    },
    /**
     * Executes query to search light curve of a given object id
     * @param {*} oid: Object id
     */
    queryDetections(oid) {
        return apiClient.post('/get_detections', { oid: oid });
    },
    /**
     * Executes query to search non detections of a given object id
     * @param {*} oid: Object id
     */
    queryNonDetections(oid) {
        return apiClient.post('/get_non_detections', { oid: oid })
    },
    /**
     * Executes query to search class probabilities of a given object id
     * @param {*} oid: Object id
     */
    queryProbabilities(oid) {
        return apiClient.post('/get_probabilities', { oid: oid })
    },
    queryFeatures(oid) {
        return apiClient.post('/get_features', { oid: oid })
    },
    queryStats(oid) {
        return apiClient.post('/get_stats', { oid: oid })
    },
    /**
     * Executes a query to download the list of objects previously filtered
     * @param {*} queryParameters: the formatted query parameters
     * @param {*} format: the desired download format
     */
    executeDownloadQuery(queryParameters, format) {
        let param = {
            query_parameters: queryParameters,
            format: format
        };
        return apiClient.post('/download', param);
    },

    queryRecentObjects(mjd, hours) {
        return apiClient.post('/recent_objects', { mjd: mjd, hours: hours })
    },
    queryRecentAlerts(mjd, hours) {
        return apiClient.post('/recent_alerts', { mjd: mjd, hours: hours })
    },
    queryClassifiedObjects(){
        return apiClient.post('/classified_objects');
    }

};
