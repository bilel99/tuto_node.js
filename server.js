// Bundle import
let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let session = require('express-session')
let fs = require('fs')

// Moteur de template
app.set('view engine', 'ejs')

// Middlewares
app.use('/assets', express.static('public'))

app.use(bodyParser.urlencoded({ extended : false }))
app.use(bodyParser.json())

app.use(session({
    secret: 'bilel',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use(require('./middlewares/flash'))
app.use(require('./middlewares/crudSession'))
app.use(require('./middlewares/webservice'))

let routes = require('./routes/web')(app)

// Ecoute sur Port
app.listen(8080)