import axios from 'axios'

const apiClient = axios.create({
    baseURL: "http://catshtm.alerce.online:5000",
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
