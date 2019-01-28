import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BusinessDetails from './BusinessDetails'

class BusinessList extends Component {
    static propTypes = {
        businessData: PropTypes.array.isRequired
    }

    constructor() {
        super()
        this.state = {
            selectedBusiness: null
        }
    }

    componentDidMount() {
        const { businessData } = this.props
        if (businessData.length === 1) {
            this.setState({ selectedBusiness: businessData[0] })
        }
    }

    selectBusiness(business) {
        this.setState({ selectedBusiness: business })
    }

    render() {
        const Button = ({ business }) => (
            <button onClick={() => this.selectBusiness(business)}>
                {business ? business.Name : 'Back'}
            </button>
        )

        return (
            <div className="business-list">
                {this.state.selectedBusiness ? (
                    <>
                        <BusinessDetails
                            businessDetails={this.state.selectedBusiness}
                        />
                        <Button business={null} />
                    </>
                ) : (
                    this.props.businessData.map(
                        business =>
                            business.Name && <Button business={business} />
                    )
                )}
            </div>
        )
    }
}

export default BusinessList
