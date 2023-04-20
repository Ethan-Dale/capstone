const hikesContainer = document.querySelector('#hikes-container')

const pageBack = document.querySelector('#backButton')
const baseURL = `http://18.118.148.214:5500/api/hikes`

const hikesCallback = ({ data: hikes}) => displayHikes(hikes)
const errCallback = err => console.log(err.response.data)

const getAllHikes = () => axios.get(baseURL).then(hikesCallback).catch(errCallback)
const deleteHike = id => axios.delete(`${baseURL}/${id}`).then(hikesCallback).catch(errCallback)


function createHikeCard(hike) {
    const hikeCard = document.createElement('div')
    hikeCard.classList.add('hike-card')

    hikeCard.innerHTML = `
        <img alt='hike image'  src="${hike.imageURL}" id="${hike.id}" class="hike-image"/>
        <div id="lowerCard">
            <div id="info">
                <h1 class="hike-name">${hike.name}</h1>
                <h3 class="hike-length">${hike.hikelength} mi</h3>
                <div class="star-rating">${'<i class="fas fa-star"></i>'.repeat(hike.rating)}</div>
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
const backBtn = () =>{
    window.location.href = "index.html"
}
const getNewHike = (event) =>{
    console.log(event.target.id)
    axios.get(`${baseURL}/${event.target.id}`).then((res)=>{

        window.location.href = `hike.html?id=${event.target.id}`
        console.log(res.data)
    }).catch((err)=>{
        console.log(err)
    })

}
getAllHikes()
pageBack.addEventListener('click', backBtn)
document.body.addEventListener('click', (event) => {
    if (event.target.matches('.hike-image')) {
        getNewHike(event);
    }
    });
