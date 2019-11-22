import axios from 'axios'

const apiClient = axios.create({
    baseURL: process.env.VUE_APP_STAMPS_API,
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
    },
    getScienceURL(object, candid) {
        return "https://avro.alerce.online/get_stamp?oid=" +
            object +
            "&candid=" +
            candid +
            "&type=science&format=png"
    },
    getTemplateURL(object, candid) {
        return "https://avro.alerce.online/get_stamp?oid=" +
            object +
            "&candid=" +
            candid +
            "&type=template&format=png"

    },
    getDifferenceURL(object, candid) {
        return "https://avro.alerce.online/get_stamp?oid=" +
            object +
            "&candid=" +
            candid +
            "&type=difference&format=png"
    }
}

