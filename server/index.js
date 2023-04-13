const express = require('express')
const cors = require('cors')


const app = express()


app.use(express.json())
app.use(cors())

const {getHike, deleteHike, addHike} = require('./controller.js')

app.get('/api/hikes', getHike)
app.delete('/api/hikes', deleteHike)
app.post('/api/hikes', deleteHike)



app.listen(5500, ()=> console.log('The server is up and running captain! code 5500'))