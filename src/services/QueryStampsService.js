import axios from 'axios'

const apiClient = axios.create({
    baseURL: "http://avro.alerce.online",
    withCredentials: false,
    headers: {
        Accept: "application/octet-stream",
        "Content-Type": "application/octet-stream"
    }
});

export default {
    queryStamp(payload) {
        return apiClient.get('/get_stamp', {
            params: {
                oid: payload.oid,
                candid: payload.candid,
                type: payload.type
            }
        })
    }
}
