const mainContainer = document.querySelector('#mainCard1')
const descContainer = document.querySelector('#descCard')
const cardOne = document.querySelector('#suggestions')
// const oneCard = document.querySelector('')

const baseURL = `http://localhost:5500/api/hikes`
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
        createMainCard(res.data)
        createDescCard(res.data)
    }).catch((err)=>{
        console.log(err)
    })

}


    

    




function createMainCard(hike){
    const mainCard = document.createElement('div')
    mainCard.classList.add('mainCard')

    mainCard.innerHTML = `<style id="mainIMG"> background-image:url(${hike.imageURL})
    
    <div id="buttons">
        <img id="backButton" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXbHBbSPP6T_8c26bDgY3nhwm0q2bVG8KqeQ&usqp=CAU">
        <img id="favBtn" src="https://cdn-icons-png.flaticon.com/512/494/494568.png">
    </div>
    <div id="info">
        <div id="name">${hike.name}</div>
        <div id="rating">${hike.rating}</div>
    
    </div>
    `
    mainContainer.appendChild(mainCard)
}
function createDescCard(hike){
    const descCard = document.createElement('div')
    descCard.classList.add('desc')

    descCard.innerHTML = `
    <h1 class="descHead">Description</h1>
    <h2 class="bodyText">${hike.description}</h2>
    `
    descContainer.appendChild(hikeCard)
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