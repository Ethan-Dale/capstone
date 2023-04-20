const mainContainer = document.querySelector('#mainCard1')
const descContainer = document.querySelector('#descCard')
const cardOne = document.querySelector('#suggestions')



const baseURL = `http://18.118.148.214:5500/api/hikes`
console.log(baseURL)

const hikeCallback = ({ data: hikes}) => displayHike(hikes)
const hikesCallback = ({ data: hikes}) => displayHikes(hikes)
const errCallback = err => console.log(err)

const getHike = () => axios.get(baseURL).then(hikeCallback).catch(errCallback)
const getThreeHikes = () => axios.get(baseURL).then(hikesCallback).catch(errCallback)

const getOneHike = (event) =>{
    console.log(event.target.id)
    axios.get(`${baseURL}/${event.target.id}`).then((res)=>{
        console.log(res.data)
        window.location.href = `hike.html?id=${event.target.id}`
    }).catch((err)=>{
        console.log(err)
    })

}

const randomAdventure = () => {
    axios.get(`http://18.118.148.214:5500/api/randomAdventure`).then((res) => {
        window.location.href = `hike.html?id=${res.data.id}`
    })
}


function createSugCards(hike){
    const sugCard = document.createElement('div')
    sugCard.classList.add('cardCss')

    sugCard.innerHTML = `
    <div id=${hike.id} onclick=getOneHike>
    <img alt='hike image' src=${hike.imageURL} id="${hike.id} "class="hike-image"/>
    <div id="lowerCard">
        <div id="inform">
        <h1 class="hike-name">${hike.name}</h1>
        <h3 class="hike-length">${hike.hikelength} mi</h3>
        <h3 class="hike-rating">${hike.rating} stars</h3>
    </div>
    </div>
    </div>
    `
    cardOne.appendChild(sugCard)
}



function displayHikes(arr) {
    cardOne.innerHTML = ``
    for (let i = 1; i < 4; i++) {
        createSugCards(arr[i])
    }
}



getThreeHikes()
cardOne.addEventListener('click', getOneHike)