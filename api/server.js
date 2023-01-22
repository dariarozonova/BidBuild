require('dotenv').config()
const express = require('express')
const app = express()
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const cors = require('cors')
const session = require('express-session')

const register = require('./register')

const login = require('./login')

const tokenValidator = require('./verifyToken')

const sessionValidator = require('./verifySession')



app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: false
}))



app.use(cors())

const PORT = process.env.SERVER_PORT;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

app.use('/api/register', register)

app.use('/api/login', login)

app.use('/api/validateToken', tokenValidator)

app.use('/api/validateSession', sessionValidator)


connection.connect((error) => {
    if (error) {
        console.error(error)
    } else {
        console.log(`MySQL connected: \n*User: ${process.env.DB_USER} \n*Database: ${process.env.DB_NAME}`)
    }
}),


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
