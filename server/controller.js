let hikes = require('./db.json')
let globalId = 4

module.exports = {
    getHike: (req, res) =>{res.status(200).send(hikes)
    },
    deleteHike: (req, res) => {
        let index = hikes.findIndex(elem => elem.id === +req.params.id)
        hikes.splice(index, 1)
        res.status(200).send(hikes)
    },

    addHike: (req, res) =>{
        let {name, length, rating, description, imageURL} = req.body
        let newHikes = {
            id: globalId,
            name,
            length,
            rating,
            description,
            imageURL
        }
        hikes.push(newHikes)
        res.status(200).send()
        globalId++
    }
}