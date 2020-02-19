const request = require('request')

//const geocodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiZGltaXRyZS1vcnR0IiwiYSI6ImNrNm9idmh5MTE5d2oza3U5YWhvMGdrNDUifQ.5KGeglMIo3BTM0eJ31FaZw"

const geocode = (address, callback) => {
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGltaXRyZS1vcnR0IiwiYSI6ImNrNm9idmh5MTE5d2oza3U5YWhvMGdrNDUifQ.5KGeglMIo3BTM0eJ31FaZw'
    
    request({url: geocodeURL, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to geocode services!')
        } else if (body.features.length === 0) {
            callback('Address provided did not match any location!')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

// geocode('Campo Grande', (error, response) => {
//     console.log(error)
//     console.log(response)
// })

module.exports = geocode