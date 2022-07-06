const request = require('request')

const forecast = (lat, lon , callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=47bf4b76884bd067f93f826589b141c3&query='+lat+','+lon+'&units=m'
    request({url,json:true},(error,{ body })=>{ //Here I have destructured response since I'm only going to be using body
        if(error) {
            callback('Unable to contact server',undefined)
        }
        else if(body.error) {
            callback('Unable to locate coordinates',undefined)
        }
        else {
            callback(undefined,{
                temperature: body.current.temperature,
                description: body.current.weather_descriptions
            })
        }
    })
}

module.exports = forecast