import React, { Component } from 'react'
import PropTypes from 'prop-types'

/* Generic form component, decided to make my own tiny one over utilizing a more 
sophisticated library for performance reasons 
(I feel that implementing a full library to fulfil a single task is excessive) */

class Form extends Component {
    static propTypes = {
        model: PropTypes.object,
        onSubmit: PropTypes.func.isRequired
    }

    constructor() {
        super()
        this.state = {}
    }

    onInputChange(key, value) {
        //Kept this generic so that I wouldn't have to write additional logic for abn/acn/name states
        this.setState({ [key]: value })
    }

    renderInput(data) {
        const { title, key, type } = data
        return (
            <input
                key={key}
                onChange={e => this.onInputChange(key, e.target.value)}
                type={type}
                placeholder={title}
                value={this.state[key] || ''}
            />
        )
    }

    render() {
        return (
            <>
                <h1>{this.props.model.formTitle}</h1>
                <form onSubmit={e => this.props.onSubmit(e, this.state)}>
                    {this.props.model.inputs.map(input =>
                        this.renderInput(input)
                    )}
                    <input type="submit" value={this.props.model.submitLabel} />
                </form>
            </>
        )
    }
}

export default Form
