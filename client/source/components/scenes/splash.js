import React from 'react'
import Styled from 'styled-components'

import Trigger from '~/actions/trigger'
import { Effect as Subject } from './../blocks/subject'
import { Logo } from './../blocks/widgets'

const Container = Styled.div`
    flex: 1 1 0;
    display: flex;
`

export default class extends React.Component {
    land = async () => {
        this.props.trigger.call(Trigger.ACTION_LAND)
    }

    componentDidMount() {
        this.interval = window.setInterval(this.land, SPLASH_SCREEN_INTERVAL)
    }

    componentWillUnmount() {
        window.clearInterval(this.interval)
    }

    render() {
        return (
            <Container>
                <Logo />
                <Subject
                    subject={this.props.state.splash.subject}
                    effects={this.props.state.splash.effects}
                    shaders={this.props.state.shaders}
                />
            </Container>
        )
    }
}
