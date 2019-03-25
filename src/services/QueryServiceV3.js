import axios from 'axios';

const apiClient = axios.create({
    baseURL: "http://alerce.xyz:8084/v3",
    withCredentials: false,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
});

export default {

    getSpatialDistribution(){
        return apiClient.post('/spatial_distribution');
    },
    getOverviewHistogram(xAxis){
        return apiClient.post('/histogram', {"x-axis": xAxis})
    },
    getOverviewScatter(payload){
        return apiClient.post('/scatter', payload);
    },
    queryObjects(query_parameters){
        return apiClient.post('/query', {query_parameters: query_parameters});
    },
    paginatedQuery(query_parameters, page, perPage){
        return apiClient.post('/paginated_query',{query_parameters: query_parameters, page: page, per_page: perPage});
    }
}