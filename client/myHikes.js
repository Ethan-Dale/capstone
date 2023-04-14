const hikesContainer = document.querySelector('#hikes-container')

const baseURL = `http://localhost:5500/api/hikes`

const hikesCallback = ({ data: hikes}) => displayHikes(hikes)
const errCallback = err => console.log(err.response.data)

const getAllHikes = () => axios.get(baseURL).then(hikesCallback).catch(errCallback)
const deleteHike = id => axios.delete(`${baseURL}/${id}`).then(hikesCallback).catch(errCallback)


function createHikeCard(hike) {
    const hikeCard = document.createElement('div')
    hikeCard.classList.add('hike-card')

    hikeCard.innerHTML = `<img alt='hike image' src=${hike.imageURL} class="hike-image"/>
    <div id="lowerCard">
    <div id="info">
    <h1 class="hike-name">${hike.name}</h1>
    <h3 class="hike-length">${hike.hikelength} mi</h3>
    <h3 class="hike-rating">${hike.rating} stars</h3>
    </div>
    <button id="unfav" onclick="deleteHike(${hike.id})">delete</button>
    </div>
    `


    hikesContainer.appendChild(hikeCard)
}

function displayHikes(arr) {
    hikesContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createHikeCard(arr[i])
    }
}

getAllHikes()
