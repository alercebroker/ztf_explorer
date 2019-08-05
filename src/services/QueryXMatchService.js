import axios from 'axios'

const apiClient = axios.create({
    baseURL: process.env.VUE_APP_XMATCH_API,
    withCredentials: false,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
});

export default {
    xmatchall(payload) {
        return apiClient.get('/crossmatch_all', {
            params: {
                ra: payload.ra,
                dec: payload.dec,
                radius: payload.radius
            }
        })
    }
}
