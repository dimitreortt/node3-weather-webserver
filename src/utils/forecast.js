const request = require('request')

const forecast = (latitude, longitude, callback) => {
    forecastURL = 'https://api.darksky.net/forecast/c319916def6afb68c81f0459961b6937/' + latitude + ',' + longitude + '?units=si&lang=en'
    
    request({url: forecastURL, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to forecast services!')
        } else if (body.error) {
            callback('Coordinates provided did not match any location!')
        } else {
            const {currently} = body
            const {summary, temperature, humidity, precipProbability:rainChance} = currently
            //console.log(currently.summary)
            callback(undefined, {
                // summary: currently.summary,
                // temperature: currently.temperature,
                // humidity: currently.humidity.toLocaleString("en", {style: "percent"}),
                // rainChance: currently.precipProbability.toLocaleString("en", {style: "percent"})
                summary,
                temperature,
                rainChance: rainChance.toLocaleString("en", {style: "percent"})
            })
        }
    })
}   

// forecast(-20.0, -50.0, (error, response) => {
//     console.log(error)
//     console.log(response)
// })

module.exports = forecast