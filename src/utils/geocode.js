const request = require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+/*To handle the uri correctly*/'.json?access_token=pk.eyJ1IjoiZWVzdGllbiIsImEiOiJjbDRyaGd0cTEwMDZjM2R1bms5ZTV5d2RzIn0.1zaOHBJ6Wb04ngds3mQxNw&limit=1'
    
    request( {url,json:true} , (error,{ body }) => { //Here I have destructured response since I'm only going to be using body
        if (error) {
            callback('Unable to connect to location services',undefined)
        }
        else if (body.features.length===0) {
            callback('Unable to find location. Try another search.',undefined)
        }
        else {
            callback(undefined,{
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                placeName: body.features[0].place_name
            })
        }
    })

}

module.exports = geocode