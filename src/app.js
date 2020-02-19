const getForecast = require('../../weather-app/app')
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()

// Define paths for express config
publicDirectoryPath = path.join(__dirname, '../public')
viewsPath = path.join(__dirname, '../templates/views')
partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and Views location
app.set('view engine', 'hbs')
app.engine('hbs', require('hbs').__express)
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Dimitre'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Dimitre'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Adress has not been provided!'
        })
    }
    getForecast(req.query.address, res)
    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia',
    //     address: req.query.address
    // })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Some useful help text',
        title: 'Help',
        name: 'Dimitre'
    })
})

app.get('help/*', (req, res) => {
    res.render('error', {
        errorMsg: 'Help article not found!',
        title: '404',
        name: 'Dimitre'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        errorMsg: 'Page not found!',
        title: '404',
        name: 'Dimitre'
    })
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})