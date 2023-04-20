const errCallback = err => console.log(err)

const form = document.querySelector('form')

const baseURL = `http://18.118.148.214:5500/api/hikes`

const createHike = body => axios.post(baseURL, body).then(hikeAdded).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()

    let name = document.querySelector('#inputName')
    let hikelength = document.querySelector('#hikelength')
    let rating = document.querySelector('input[name="ratings"]:checked')
    let description = document.querySelector('#inputDesc')
    let imageURL = document.querySelector('#inputImg')


    let bodyObj = {
        name: name.value,
        hikelength: hikelength.value,
        rating: rating.value,
        description: description.value,
        imageURL: imageURL.value
    }

    createHike(bodyObj)

    name.value = ''
    hikelength.value = ''
    rating.checked = false
    description.value = ''
    imageURL.value = ''

}



const hikeAdded = () =>{
    console.log('it worked')
    alert("Hike added! Check the 'My hikes' page to view it!")
}

form.addEventListener('submit', submitHandler)
