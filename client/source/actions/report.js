import Axios from 'axios'

import Trigger from './trigger'
import { Analytic } from '~/helpers'

export default async (trigger, message) => {
    try {
        let state = trigger.state()
        let oldstatus = state.status
        state.status = Trigger.STATUS_WAIT
        trigger.push(Trigger.ACTION_WAIT, state)

        state = trigger.state()
        await Axios.post('report', {
            token: state.token,
            message,
        })
        state.status = oldstatus
        trigger.push(Trigger.ACTION_REPORT, state)
        return state
    } catch (exception) {
        Analytic.event(Analytic.EVENT_ERROR, exception)
        trigger.push(Trigger.ACTION_RELOAD, { status: Trigger.STATUS_ERROR })
        throw exception
    }
}
