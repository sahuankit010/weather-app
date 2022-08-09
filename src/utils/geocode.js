const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2FodWFua2l0MDEwIiwiYSI6ImNsNjBpNzdhMzFvNTkzZG8xd3R6MW44ZG0ifQ.63WtWLaGQdiRUA4zugFUwg'

    request({url:url, json: true}, (error, {body}) => {
        if(error){
            callback("Unable to connect to location services", undefined)
        } else if(!body.features.length){
            callback('No place found!', undefined)
        } else {
            const places = []
            const data = body
        data.features.forEach(element => {
            places.push({location: element.place_name,
            latitude: element.center[0],
            longitude: element.center[1]})
        })
        callback(undefined, places)
        }
    })
}

module.exports = geocode