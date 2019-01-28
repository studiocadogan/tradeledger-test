import React from 'react'
import ReactDOM from 'react-dom'
import Form from '../components/Form'

it('Renders without errors when necessary props are in place', () => {
    const props = {
        model: {
            formTitle: 'Test Form',
            inputs: [{ type: 'text', key: 'test', title: 'Test' }]
        },
        onSubmit: (e, state) => console.log(e, state)
    }
    const div = document.createElement('div')
    ReactDOM.render(<Form {...props} />, div)
    ReactDOM.unmountComponentAtNode(div)
})
