const BASE_URL = "http://localhost:3000"
const LOCATIONS_URL = `${BASE_URL}/locations`

const modalContent = document.getElementById("modalContent")

// class City {
//     constructor(city, trails){
//         this.city = city
//         this.trails = trails
//     }
//     addContent(){
//         const title = document.getElementById("modalTitle")
//         const content = document.getElementById("modalContent")
//         title.innerHTML = this.city
//     }

//     renderModal(){}
// }



document.addEventListener("DOMContentLoaded", function(event) {
    fetch(LOCATIONS_URL) 
    .then(res => res.json())
    .then(res => {
       res.forEach(location => {
           displayCity(location)
           document.getElementById(location.id).addEventListener("click", function(event) {
                addModalContent(location) // acts content to DOM, but not visible
                document.getElementById("modal").style.display = "block" //now visible
           })
       })
    })
})

let close = document.getElementById("closeModal")

close.addEventListener("click", function(event){
  document.getElementById("modal").style.display = "none"
  document.getElementById("modalContent").innerHTML = "" //remove modal content to start over
})

let cityform = document.getElementById("cityForm")

cityform.addEventListener("submit", function(event){
    event.preventDefault();

    fetch(LOCATIONS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({city: event.target.city.value})
    })
    .then(res => res.json())
    .then(data => { 
        let cityTitle = document.createElement("h3");
        cityTitle.id = data.data.id
        cityTitle.textContent = data.data.attributes.city
        document.getElementById("locationsContainer").appendChild(cityTitle)
      })

})

function displayCity(location) {
    let cityTitle = document.createElement("h3");
    cityTitle.id = location.id
    cityTitle.textContent = location.city
    document.getElementById("locationsContainer").appendChild(cityTitle)
}


function addModalContent(location) {
    location.trails.forEach(trail => {
        let traildiv = document.createElement("div")
        traildiv.className = "trailcard"
        let trailtitle = document.createElement("h4")
        let trailsummary = document.createElement("p")
        let traildifficulty = document.createElement("p")
        let traillikes = document.createElement("p")

        trailtitle.innerHTML = trail.name
        trailsummary.innerHTML = trail.description
        traildifficulty.innerHTML = `Difficulty: ${trail.difficulty}`
        traillikes.innerHTML = "Likes: " + trail.likes

        traildiv.appendChild(trailtitle)
        traildiv.appendChild(trailsummary)
        traildiv.appendChild(traildifficulty)
        traildiv.appendChild(traillikes)

        modalContent.appendChild(traildiv)
    })
}