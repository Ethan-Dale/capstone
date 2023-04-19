let hikes = require('./db.json')
// let favoriteHikes = require('./favorites.json')
let globalId = 22
// console.log(hikes[1])
let currentHikeId = 0
let shuffledHikes = hikes.slice().sort(() => Math.random() - 0.5)
let lastHikeIndex = -1

module.exports = {
    getHikes: (req, res) =>{
        
        res.status(200).send(hikes)
    },
    getRandomHike: (req, res) => {
        if (shuffledHikes.length === 0) {
          
          shuffledHikes = hikes.slice().sort(() => Math.random() - 0.5)
          lastHikeIndex = -1
        }
      
        let index;
        do {
          index = Math.floor(Math.random() * shuffledHikes.length)
        } while (index === lastHikeIndex)
        
        lastHikeIndex = index;
        const randomHike = shuffledHikes[index]
      
        res.status(200).send(randomHike)
      },

    deleteHike: (req, res) => {
        let index = hikes.findIndex(elem => elem.id === +req.params.id)
        hikes.splice(index, 1)
        res.status(200).send(hikes)
    },

    addHike: (req, res) =>{
        console.log(hikes)
        const {name, hikelength, rating, description, imageURL} = req.body
        
        let newHikes = {
            name,
            hikelength,
            rating: +rating,
            description,
            imageURL,
            id: globalId
        }
        console.log(newHikes)
        hikes.push(newHikes)
        globalId++
        res.status(200).send(hikes)
    },
    getOneHike: (req, res) =>{
        let {id} = req.params
        currentHikeId = id -= 1
        console.log(currentHikeId)
        res.status(200).send(hikes[currentHikeId])
    },
    getOneHikeTwo: (req, res) =>{
        res.status(200).send(hikes[currentHikeId])
    },
    randomAdventure:(req, res)=>{
        currentHikeId = Math.floor(Math.random() * hikes.length)
        res.status(200).send(hikes[currentHikeId])
    }
}