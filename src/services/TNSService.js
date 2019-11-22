import axios from 'axios'

const apiClient = axios.create({
    baseURL: process.env.VUE_APP_TNS_API,
    withCredentials: false,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    }
});


export default {
    searchTNS(data){
        return apiClient.post("/search", data);
    }
}