import Axios from 'axios'

import * as Constants from '~/constants'
import Trigger from './trigger'

export default (trigger, label = '') => {
    let state = trigger.state()
    return new Promise((resolve, reject) => {
        Axios.get(Constants.ACTION_FETCH, {
            params: {
                token: state.token,
                label: label,
            },
        })
            .then(response => {
                let state = trigger.state()
                state.identity = response.data.identity
                state.task = response.data.task
                state.status = Constants.STATE_STATUS_ACTIVE
                state.option = null
                state.timestamp = null
                trigger.push(Trigger.ACTION_FETCH, state)
                resolve()
            })
            .catch(exception => {
                console.log(exception)
                reject()
            })
    })
}
