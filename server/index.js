const express = require('express')
const cors = require('cors')


const app = express()


app.use(express.json())
app.use(cors())

const {getHikes, getRandomHike, deleteHike, addHike, getOneHike } = require('./controller')

app.get('/api/hikes/', getHikes)
app.get('/api/hikes', getRandomHike)
app.delete('/api/hikes/:id', deleteHike)
app.post('/api/hikes', addHike)
app.get('/api/hikes/:id', getOneHike)



app.listen(5500, ()=> console.log('The server is up and running captain! code 5500'))