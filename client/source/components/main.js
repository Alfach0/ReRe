import React from 'react'
import * as Redux from 'react-redux'
import * as Reflexbox from 'reflexbox'

import Trigger from '~/actions/trigger'
import Process from './scenes/process'
import Result from './scenes/result'

class Main extends React.Component {
    view(trigger, state) {
        switch (state.status) {
            case trigger.STATUS_ACTIVE:
                return <Process trigger={trigger} state={state} />

            case trigger.STATUS_CORRECT:
            case trigger.STATUS_WRONG:
                return <Result trigger={trigger} state={state} />

            default:
                return null
        }
    }

    render() {
        if (!this.props.state || !'status' in this.props.state) {
            return null
        }

        return (
            <Reflexbox.Flex style={{ width: '100vw', height: '100vh' }}>
                {this.view(this.props.trigger, this.props.state)}
            </Reflexbox.Flex>
        )
    }
}

export default Redux.connect(state => {
    return { state }
})(Main)
