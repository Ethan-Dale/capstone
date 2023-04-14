let hikes = require('./db.json')
let globalId = 4
console.log(hikes[1])
let currentHikeId = 0
module.exports = {
    getHikes: (req, res) =>{
        res.status(200).send(hikes)
    },
    getRandomHike: (req, res) =>{
       let index = Math.floor(Math.random() * hikes.length)
        res.status(200).send(hikes[index])
    },
    deleteHike: (req, res) => {
        let index = hikes.findIndex(elem => elem.id === +req.params.id)
        hikes.splice(index, 1)
        res.status(200).send(hikes)
    },

    addHike: (req, res) =>{
        let {name, hikelength, rating, description, imageURL} = req.body
        let newHikes = {
            id: globalId,
            name,
            hikelength,
            rating,
            description,
            imageURL
        }
        hikes.push(newHikes)
        globalId++
        res.status(200).send(hikes)
    },
    getOneHike: (req, res) =>{
        res.status(200).send(hikes)
    }
}