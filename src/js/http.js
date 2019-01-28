import axios from 'axios'

function getCorrectUrl(type) {
    switch (type) {
        case 'name':
            return 'MatchingNames.aspx'
        case 'abn':
            return 'AbnDetails.aspx'
        case 'acn':
            return 'AcnDetails.aspx'
        default:
            return null
    }
}

export function getBusinessData(type, params) {
    const httpData = {
        method: 'get',
        params: {
            ...params,
            guid: 'b6242120-5bce-4b10-9839-d3045a7682da'
        },
        url: `https://abr.business.gov.au/json/${getCorrectUrl(type)}`
    }

    return axios(httpData)
}
