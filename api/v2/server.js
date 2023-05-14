require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

//Importē un definē kontrolierus
const pakalpojumi = require('./routers/pakalpojumsRouter')

const rezervacijas = require('./routers/rezervacijaRouter')

const lietotaji = require('./routers/userRouter')

app.use('/api/v2/pakalpojumi', pakalpojumi)

app.use('/api/v2/rezervacijas', rezervacijas)

app.use('/api/v2/lietotaji', lietotaji);



const PORT = process.env.SERVER_PORT;




app.listen(PORT, '192.168.31.134', () => {
  console.log(`Server listening on address http://192.168.31.134/${PORT}`)
})
