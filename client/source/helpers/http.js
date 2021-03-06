import Axios from 'axios'

import { Crypto, Json } from './'

Axios.defaults.baseURL = `${SCHEMA}://${API_URL}`
Axios.defaults.timeout = API_TIMEOUT
export default class {
    static async process(action, params = {}, ctyptokey = null) {
        let endpoint = action.split('-')[1]
        let response = await Axios.post(endpoint, params)
        return ctyptokey
            ? Json.decode(Crypto.decrypt(ctyptokey, response.data))
            : response.data
    }

    static async read(endpoint) {
        let response = await Axios.get(endpoint)
        return response.data
    }
}
