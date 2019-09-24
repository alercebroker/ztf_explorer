import axios from 'axios'

const apiClient = axios.create({
    baseURL: "http://avro.alerce.online",
    withCredentials: false,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
});

export default {
    getAvroInfo(payload) {
        return apiClient.get('/get_avro_info', {
            params: {
                oid: payload.oid,
                candid: payload.candid,
            }
        })
    }
}
