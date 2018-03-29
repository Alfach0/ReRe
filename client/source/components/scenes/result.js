import React from 'react'
import * as Reflexbox from 'reflexbox'

import Trigger from '~/actions/trigger'
import Pick from './../blocks/pick/plain'
import Subject from './../blocks/subject/plain'
import Next from './../blocks/toolbar/marks/next'

export default class extends React.Component {
    render() {
        if (!this.props.state || !this.props.state.task) {
            return null
        }

        return (
            <Reflexbox.Flex auto>
                <Reflexbox.Box flex column w="90%">
                    <Reflexbox.Box flex auto style={{ height: '80%' }}>
                        <Subject
                            trigger={this.props.trigger}
                            subject={this.props.state.task.subject}
                        />
                    </Reflexbox.Box>
                    <Reflexbox.Box flex style={{ height: '20%' }} mt="1.0em">
                        <Pick
                            trigger={this.props.trigger}
                            options={this.props.state.task.options}
                            option={this.props.state.task.option}
                        />
                    </Reflexbox.Box>
                </Reflexbox.Box>
                <Reflexbox.Box w="10%">
                    <Next trigger={this.props.trigger} />
                </Reflexbox.Box>
            </Reflexbox.Flex>
        )
    }
}
