require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

//Importē un definē routerus
const pakalpojumi = require('./routers/pakalpojumsRouter')

const rezervacijas = require('./routers/rezervacijaRouter')

const lietotaji = require('./routers/userRouter')

const auth = require('./routers/authRouter')

const sfera = require('./routers/sferaRouter')

const grafiks = require('./routers/grafiksRouter')

const atsauksmes = require('./routers/atsauksmeRouter')

app.use('/api/v2/pakalpojumi', pakalpojumi)

app.use('/api/v2/rezervacijas', rezervacijas)

app.use('/api/v2/lietotaji', lietotaji);

app.use('/api/v2/auth', auth)

app.use('/api/v2/sferas', sfera)



const PORT = process.env.SERVER_PORT;




app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
