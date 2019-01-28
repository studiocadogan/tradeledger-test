import React, { Component } from 'react'
import PropTypes from 'prop-types';


class BusinessDetails extends Component {
    static propTypes = {
        businessDetails: PropTypes.object.isRequired
    }
    render() {
        const {businessDetails} = this.props;
        return (
            <div className="business-details">
                {Object.keys(businessDetails).map(key => businessDetails[key] && <p>{key.replace(/([A-Z])/g, ' $1').trim()}: {businessDetails[key]}</p>)}
            </div>
        )
    }
}

export default BusinessDetails
