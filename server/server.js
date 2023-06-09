const express = require('express')
const cors = require('cors')
const path = require('path');


const app = express()


app.use(express.static(`public`))
app.use(express.json())
app.use(cors())

const {getHikes, getRandomHike, deleteHike, addHike, getOneHike, getOneHikeTwo, randomAdventure } = require('./controller')

app.get('/api/hikes/', getHikes)
app.get('/api/randomHike/:id', getRandomHike)
app.delete('/api/hikes/:id', deleteHike)
app.post('/api/hikes', addHike)
app.get('/api/hikes/:id', getOneHike)
app.get('/api/oneHike', getOneHikeTwo)
app.get('/api/randomAdventure', randomAdventure)
app.use(express.static(`${__dirname}/public`))
app.get('/', (req, res) => {
  res.sendFile(path.join('public', 'index.html'))
})



app.listen(5500, ()=> console.log('The server is up and running captain! code 5500'))