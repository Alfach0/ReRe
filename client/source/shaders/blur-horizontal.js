import React from 'react'
import * as GlReact from 'gl-react'

import Shaders from './list'

export default class BlurHorizontal extends React.Component {
    render() {
        return (
            <GlReact.Node
                shader={Shaders.blur}
                uniforms={{
                    factor: 60.0,
                    sigma: 20.0,
                    orientation: 1,
                    size: this.props.size,
                    texture: this.props.children,
                }}
            />
        )
    }
}
