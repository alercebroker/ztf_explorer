import axios from 'axios'

const apiClient = axios.create({
    baseURL: "http://alerce.xyz:8084/v2",
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
    getSQL(queryParameters){
        return apiClient.post('/get_sql', {query_parameters: queryParameters});
    },
    /**
     * Executes query to search objects given selected parameters
     * @param {*} queryParameters: formatted query parameters
     */
    executeQuery(queryParameters){
        return apiClient.post('/query', {query_parameters: queryParameters});
    },
    /**
     * Checks the status of an executed query
     * @param {*} taskID: id of the executed query
     */
    checkQueryStatus(taskID){
        let param = {
            "task-id": taskID
        };
        return apiClient.post('/query_status', param);
    },
    /**
     * If a query has finished, this method gets the results of it in a paginated fashion
     * @param {*} taskID: id of the finished query
     * @param {*} pageSize: number of elements per page
     * @param {*} pageNumber: page that we want to retrieve
     */
    getPaginatedResult(taskID, pageSize, pageNumber){
        let param = {
            "task-id": taskID,
            "page-size": pageSize,
            "page-number": pageNumber
        };
        return apiClient.post('/paginated_result', param);
    },
    /**
     * Executes a query to get the details of a specific object
     * @param {*} objectId: id of the object
     */
    executeObjectQuery(objectId){
        return apiClient.post('/query_alerts',{oid: objectId});
    },
    /**
     * Gets the result of a finished query about the details of a specific object
     * @param {*} taskId: id of the finished query
     */
    getResult(taskId){
        return apiClient.post('/result', {'task-id': taskId});
    },
    /**
     * Executes a query to download the list of objects previously filtered
     * @param {*} queryParameters: the formatted query parameters
     * @param {*} format: the desired download format
     */
    executeDownloadQuery(queryParameters, format){
        let param = {
            query_parameters: queryParameters,
            format: format
        };
        return apiClient.post('/download', param);
    },
    queryClassList(){
        return apiClient.post('/query_classes');
    },
    getClassList(taskId){
        return apiClient.post('/get_classes', {'task-id': taskId});
    },

};
