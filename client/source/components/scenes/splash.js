import React from 'react'
import Styled from 'styled-components'

import Trigger from '~/actions/trigger'
import { Effect as Subject } from './../blocks/subject'
import { Logo } from './../blocks/other'

const Container = Styled.div`
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
`

export default class extends React.Component {
    fetch = async () => {
        this.props.trigger.call(Trigger.ACTION_FETCH)
    }

    componentDidMount() {
        this.interval = window.setInterval(this.fetch, SPLASH_SCREEN_INTERVAL)
    }

    componentWillUnmount() {
        window.clearInterval(this.interval)
    }

    render() {
        if (this.props.state.splash) {
            return (
                <Container>
                    <Subject
                        trigger={this.props.trigger}
                        subject={this.props.state.splash.subject}
                        effects={this.props.state.splash.effects}
                        shaders={this.props.state.shaders}
                        blobs={this.props.state.blobs}
                    />
                    <Logo />
                </Container>
            )
        }
        return <Logo />
    }
}
