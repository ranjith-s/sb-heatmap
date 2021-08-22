const axios = require('axios');

export const getHeatMapData = async () => {
    return axios.get('https://run.mocky.io/v3/09a1870d-294b-4d53-ac4f-87b676ddd000')
        .then(({ data }) => {
            return data
        }).catch(error => {
            console.log(error)
            return null
        })
}
