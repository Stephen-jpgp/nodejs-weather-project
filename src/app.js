const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

//Define paths for express config 
const pathDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views' , viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(pathDirectory))

// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req,res) => {
//     res.send([{
//         name: 'Andrew',
//         age: 27,
//     },    {
//         name: 'Sarah',
//         age: 23,
//     }])
// })

// app.get('/about', (req,res) => {
//     res.send('<title>Title</title>')
// })

app.get('',(req,res) => {
    res.render('index', {
        title: 'Weather ',
        name: 'Stephen James',
    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title: "About Me",
        name: "Stephen James"
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        helpText:"This is some helpful text",
        title: "Help",
        name: "Stephen James",
    })
})

app.get('/weather' , (req,res) => {
    if(!req.query.address){
        return res.send({
            error: "You must provide address",
        })
    }
    geocode(req.query.address , (error , { latitude , longtitude , placeName } = {}) => {
        if(error){
            return res.send({
                error,
            })
        }
        forecast (latitude, longtitude ,(error,{ temperature , description }) =>{
            if(error){
                return res.send({
                    error,
                })
            } 
            // console.log(placeName)
            // console.log(temperature,description)
            res.send({
                temperature,
                placeName,
                description,
            })

        })
    })
    // res.send({
    //     forecast: 'It is rainy',
    //     location: 'Georgia',
    //     address: req.query.address,
    // })
})

app.get('/products', (req,res) => {
    if(!req.query.search) {
        return res.send({
            error: "You must provide a search term",
        })
    }
    console.log(req.query.search)
    res.send({
        products: [],
    })
})

// app.com
// app.com/help
// app.com/about

app.get('/help/*', (req,res) => {
    res.render('404', {
        message: 'Help article not found',
        title: "404",
        name: "Etienne",
    })
})

app.get('*', (req,res) => {
    res.render('404',
    {
        message: "Page not found",
        title: "404",
        name: "Etiennes",
    })
})

app.listen(3000, () => {
    console.log('Server is up in port 3000.')
})