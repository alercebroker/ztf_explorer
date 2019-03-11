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
    }
}