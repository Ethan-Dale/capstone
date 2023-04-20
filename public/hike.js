const mainContainer = document.querySelector('#mainCard1')
const descContainer = document.querySelector('#descCard')
const cardOne = document.querySelector('#suggestions')
const anotherBtn = document.querySelector('#random')


const baseURL = `http://18.118.148.214:5500/api/hikes`
console.log(baseURL)

const hikeCallback = ({ data: hikes }) => displayHike(hikes)
const hikesCallback = ({ data: hikes }) => displayHikes(hikes)
const errCallback = err => console.log(err)

const getHike = () => axios.get(baseURL).then(hikeCallback).catch(errCallback)
const getThreeHikes = () => axios.get(baseURL).then(hikesCallback).catch(errCallback)


const getOneHike = (event) =>{
    axios.get(`http://18.118.148.214:5500/api/oneHike`).then((res)=>{
        console.log(res.data)
        createMainCard(res.data)
        createDescCard(res.data)
        namePage(res.data)
    }).catch((err)=>{
        console.log(err)
    })

}

const getNewHike = (event) =>{
    console.log(event.target.id)
    axios.get(`${baseURL}/${event.target.id}`).then((res)=>{
        console.log(res.data)
        createMainCard(res.data)
        createDescCard(res.data)
        namePage(res.data)
    }).catch((err)=>{
        console.log(err)
    })

}
const getRandomHike = () => {
    let id = document.querySelector('#info')
    axios.get(`http://18.118.148.214:5500/api/randomHike/${id.textContent}`).then((res)=>{
      console.log(res.data)
      createMainCard(res.data)
      createDescCard(res.data)
      namePage(res.data)
    });
  };

function namePage(hike) {
    const pageName = document.getElementById("pageName")
    pageName.innerHTML = hike.name
    const mountName = document.getElementById("found")
    mountName.innerHTML = hike.name
}

function createMainCard(hike){
    mainContainer.innerHTML = ''
    const mainCard = document.createElement('div')
    mainCard.classList.add('mainCard')
    console.log(hike)
    mainCard.innerHTML = `
    <div id="wholeNewCard" style="background-image: url('${hike.imageURL}'); background-size: cover;">
        <div id="buttons">
            <button id="backButton" onclick="backBtn()" >➾</button>
            <input type="checkbox" id="favBtn" onclick="addToFavs()"></input>
        </div>
        <div id="info" class="${hike.id}">
            <div id="name">${hike.name}</div>
            <div class="star-rating">${'<i class="fas fa-star"></i>'.repeat(hike.rating)}
</div>
        </div>
    </div>
`
    mainContainer.appendChild(mainCard)
}
const backBtn = () =>{
    window.location.href = "index.html"
}

function createDescCard(hike){
    descContainer.innerHTML = ''
    const descCard = document.createElement('div')
    descCard.classList.add('desc')

    descCard.innerHTML = `
    <div id="description">
    <h1 class="descHead">Description</h1>
    <h2 class="bodyText">${hike.description}</h2>
    </div>
    `
    descContainer.appendChild(descCard)
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
getOneHike()
cardOne.addEventListener('click', getNewHike)
anotherBtn.addEventListener('click', getRandomHike)