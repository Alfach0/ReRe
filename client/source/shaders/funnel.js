import React from 'react'
import * as GlReact from 'gl-react'

import Shaders from './list'

export default class Funnel extends React.Component {
    render() {
        return (
            <GlReact.Node
                shader={Shaders.funnel}
                uniforms={{
                    size: this.props.size,
                    texture: this.props.children,
                }}
            />
        )
    }
}
