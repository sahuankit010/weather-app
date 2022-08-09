const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)


//Setup static directory to use, which is not in use currently
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Ankit Sahu'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Ankit Sahu'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        message: 'How can I help you?',
        title: 'Help',
        name: 'Ankit Sahu'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'You must provide a address term!'
        })
    }
    geocode(req.query.address, (error, data) => {
        if(error){
            return res.send({error})
        }
        forecast(data[0].location, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location: data[0].location
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help article not found.',
        name: 'Ankit Sahu'
    })
})
  
app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found.',
        name: 'Ankit Sahu'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
