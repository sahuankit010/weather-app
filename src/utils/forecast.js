const request = require('postman-request')

const forecast = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ba33bc1e49707c7a2215387137814e85&query=' + encodeURIComponent(address)
    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect!', undefined)
        } else if (body.error) {
            callback(body.error.info, undefined)
        }
        else {
            const outsideTemp = body.current.temperature
            const feelsLike = body.current.feelslike
            const pressure = body.current.pressure
            const humidity = body.current.humidity
            const precipitation = body.current.precip
            callback(undefined,{
                outsideTemp: outsideTemp,
                feelsLike: feelsLike,
                pressure: pressure,
                humidity: humidity,
                precipitation: precipitation,
                description: body.current.weather_descriptions[0],
            })
        }
    })
}

module.exports = forecast