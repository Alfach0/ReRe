import React from 'react'

import Subject from './subject'

export default class extends React.Component {
    render() {
        return <Subject subject={this.props.subject} />
    }
}
