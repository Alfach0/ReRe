import Lodash from 'lodash'
import React from 'react'
import * as Reflexbox from 'reflexbox'

export default class Positive extends React.Component {
    shouldComponentUpdate(props) {
        return !Lodash.isEqual(props, this.props)
    }

    render() {
        return (
            <Reflexbox.Flex
                column
                w="30%"
                justify="space-between"
                style={{ borderStyle: 'solid', borderWidth: '0.1em' }}
            >
                <Reflexbox.Box
                    style={{ textAlign: 'center', fontWeight: 'bold' }}
                >
                    {this.props.children}
                </Reflexbox.Box>
                <Reflexbox.Box
                    style={{ textAlign: 'justify', fontWeight: 'normal' }}
                >
                    <q>{this.props.hint}</q>
                </Reflexbox.Box>
            </Reflexbox.Flex>
        )
    }
}
