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

    getDataframeFilters(query_parameters){
        return apiClient.post('/get_sql', {query_parameters: query_parameters})
    },
    getSpatialDistribution(){
        return apiClient.post('/spatial_distribution');
    },
    getQueryHistogram(payload){
        return apiClient.post('/query_histogram', payload);
    },
    getQueryScatter(payload){
        return apiClient.post('/query_scatter', payload);
    },
    queryObjects(query_parameters){
        return apiClient.post('/query', {query_parameters: query_parameters});
    },
    queryStatus(queryId){
        return apiClient.post('/check_query_status', {"query-id": queryId})
    },
    paginatedResult(queryId, page, perPage){
        return apiClient.post('/get_paginated_result',{
            "query-id": queryId,
            "page": page,
            "per_page": perPage
        })
    },
    paginatedQuery(query_parameters, page, perPage){
        return apiClient.post('/paginated_query',{query_parameters: query_parameters, page: page, per_page: perPage});
    },
    countClass(){
        return apiClient.post('/class_counts');
    }
}