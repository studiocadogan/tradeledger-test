import React, { Component } from 'react'
import Form from './Form'
import BusinessList from './BusinessList'
import { getBusinessData } from '../js/http'

class LookUpContainer extends Component {
    constructor() {
        super()

        this.state = {
            type: 'name',
            possibleTypes: [
                { title: 'ABN', key: 'abn' },
                { title: 'Name', key: 'name' },
                { title: 'ACN', key: 'acn' }
            ]
        }

        this.onFormSubmit = this.onFormSubmit.bind(this)
    }

    onFormSubmit(e, form) {
        e.preventDefault()
        getBusinessData(this.state.type, {
            [this.state.type]: form[this.state.type]
        }).then(res => this.handleResponse(res.data))
    }

    handleResponse(data) {
        this.setState({ businessData: data.Names ? data.Names : [data] })
    }

    renderForm() {
        const nameForm = {
            formTitle: 'Search by Name',
            inputs: [{ title: 'Company Name', key: 'name', type: 'text' }]
        }

        const abnForm = {
            formTitle: 'Search by ABN',
            inputs: [{ title: 'ABN', key: 'abn', type: 'text' }]
        }

        const acnForm = {
            formTitle: 'Search by ACN',
            inputs: [{ title: 'ACN', key: 'acn', type: 'text' }]
        }

        const getFormByType = type => {
            switch (type) {
                case 'name':
                    return nameForm
                case 'abn':
                    return abnForm
                case 'acn':
                    return acnForm
                default:
                    return null
            }
        }

        return (
            <Form
                model={{
                    ...getFormByType(this.state.type),
                    submitLabel: 'Search'
                }}
                onSubmit={this.onFormSubmit}
            />
        )
    }

    renderSearchTypes() {
        const onSelection = e =>
            this.setState({ type: e.target.value, businessData: null })
        return (
            <select value={this.state.type} onChange={onSelection}>
                {this.state.possibleTypes.map(type => (
                    <option key={type.key} value={type.key}>
                        {type.title}
                    </option>
                ))}
            </select>
        )
    }

    render() {
        return (
            <div className="lookup-container">
                <div className="lookup-form">
                    <h2>Search By:</h2>
                    <div className="lookup-selection">
                        {this.renderSearchTypes()}
                    </div>
                    {this.renderForm()}
                    {this.state.businessData && (
                        <BusinessList businessData={this.state.businessData} />
                    )}
                </div>
            </div>
        )
    }
}

export default LookUpContainer
