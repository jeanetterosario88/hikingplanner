const BASE_URL = "http://localhost:3000"
const LOCATIONS_URL = `${BASE_URL}/locations`
const TRAILS_URL = `${BASE_URL}/trails`

const modalContent = document.getElementById("modalContent")
let locationData = []

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
           // locationData.push(location)
           document.getElementById(location.id).addEventListener("click", function() {
               fetch(`${LOCATIONS_URL}/${location.id}`)
               .then(res => res.json())
               .then(res => {
                    addModalContent(res)
               })
           
            document.getElementById("modal").style.display = "block" //now visible
       })
       })
    })
})

let close = document.getElementById("closeModal")

close.addEventListener("click", function(event){
  document.getElementById("modal").style.display = "none"
  document.getElementById("trailcards").innerHTML = "" //remove modal content to start over
  resetModal();
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
    .then(res => {
        console.log(res);
        let cityTitle = document.createElement("h3");
        cityTitle.id = res.data.id;
        cityTitle.textContent = res.data.attributes.city;
        document.getElementById("locationsContainer").appendChild(cityTitle);
    })
})

function displayCity(location) {
    let cityTitle = document.createElement("h3");
    cityTitle.id = location.id
    cityTitle.textContent = location.city
    document.getElementById("locationsContainer").appendChild(cityTitle)
}

function addModalContent(location) {
    let addtrailbutton = document.getElementById("newtrail")
    addtrailbutton.addEventListener("click", displaytrailform)
    // sort by likes
    const sortedTrails = location.included.sort((a,b) => b.attributes.likes - a.attributes.likes)
    sortedTrails.forEach(trail => displayTrailCard(trail.attributes))
    function displayTrailCard(trail, cardFromForm=false) {
        console.log(trail, "TESTINGG")
        let traildiv = document.createElement("div")
        traildiv.className = "trailcard"
        let trailtitle = document.createElement("h4")
        let trailsummary = document.createElement("p")
        trailsummary.id = "fulldescription"
        let trailsummaryshort = document.createElement("p")
        trailsummaryshort.id = "shortdescription"
        let traildifficulty = document.createElement("p")
        let traillikes = document.createElement("p")
        let trailcards = document.getElementById("trailcards")
        let addlikes = document.createElement("span")
        addlikes.id = "addlikes"
        let readmore = document.createElement("span")
        readmore.className = "readread"
        let readless = document.createElement("span")
        readmore.className = "readread"

        trailtitle.innerHTML = trail.name
        traildifficulty.innerHTML = `Difficulty: ${trail.difficulty}`
        traillikes.innerHTML = "Likes: " + trail.likes
        addlikes.innerHTML = "&#x1f44d;"
        readmore.innerHTML = "...Read More"
        readless.innerHTML = "...Read Less"
        trailsummary.innerHTML = `Description: ${trail.description}`
        trailsummaryshort.innerHTML = `Description: ${trail.description.slice(0, 25)}`
       // trailsummary.appendChild(readless)
        trailsummaryshort.appendChild(readmore)

        traildiv.appendChild(trailtitle)
        traildiv.appendChild(traildifficulty)
        traildiv.appendChild(traillikes)
        traildiv.appendChild(trailsummary)
        traildiv.appendChild(trailsummaryshort)
        traildiv.appendChild(addlikes)
        
        if (cardFromForm) {
            trailcards.prepend(traildiv)
            traildiv.style.backgroundColor = "blue"
        } else {
            trailcards.appendChild(traildiv)
        }
        
        let readmoreclicked = false
        document.querySelectorAll(".readread").forEach(element => {
            element.addEventListener("click", function(event){
                            if (readmoreclicked === false){
                                trailsummaryshort.style.display = "none"
                                trailsummary.style.display = "inline"
                                readmoreclicked = true
                            } else{
                                trailsummaryshort.style.display = "inline"
                                trailsummary.style.display = "none"
                                readmoreclicked = false
                            }
                        })
        })

       


        //     readmore.innerHTML = " ...Read More";
        //     trailsummary.innerHTML = `Description: ${trail.description}`
        //     readmore.innerHTML = " ...Read Less"
        //     trailsummary.appendChild(readmore)
        //     readmore.id = "readlessid"
        //     document.getElementById("readlessid").addEventListener("click", function(event){
        //         trailsummary.innerHTML = `Description: ${summarytext}`
        //         readmore.innerHTML = trail.description.length > 25 ? " ...Read More" : "";
        //         trailsummary.appendChild(readmore)
        //         readmore.id = "readmoreid"
        //         console.log(readmore.id)
        //     })

        addlikes.addEventListener("click", function(event){
            console.log(trail.id, "Trail ID on Add Likes Event Listen")
            fetch(`${TRAILS_URL}/${trail.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
            })
            .then(res => res.json())
            .then(res => {
                console.log(res)
            })
        })
        
    }

 

    function displaytrailform(){
        let trailForm = document.getElementById("newTrail");
        //Step 1: hide the trail cards
        document.getElementById("trailcards").classList.add("hidden");
        //Step 2: Show the form
        trailForm.classList.remove("hidden");
        //Step 3: Fill in hidden field of "location_id"
        document.getElementById("trail-location-id").value = location.data.id
        //Step 4: Change/update heading for form
        document.getElementById("trail-location-name").textContent = location.city;
        //Step 5: Add an eventListener to the new Trail form sumbit that will handle the submit (in its own function)
        trailForm.addEventListener("submit", submitNewTrail)
    }

    function submitNewTrail(event) {
        event.preventDefault();

        const location_id = event.target.location_id.value
        const formData = {
            name: event.target.name.value,
            difficulty: event.target.difficulty.value,
            description: event.target.description.value,
            image: event.target.image.value,
            location_id: location_id
        }
        //fetch of the form data into (post) our DB
        fetch(TRAILS_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(res => {
            //hide the form
            resetModal();
            //then we append the new trail on the modal as a trail card as the first card (top of the list)
            displayTrailCard(res.data.attributes, cardFromForm=true);

            //and make the new trail card styled (blue background) with a specific class
            //show the previous trails  
        
        })
    }

}
function resetModal() {
    let newtrail = document.getElementById("newTrail");
    newtrail.classList.add("hidden")
    document.getElementById("trailcards").classList.remove("hidden");
    newtrail.name.value = "";
    newtrail.description.value = "";
    newtrail.difficulty.value = "";
    newtrail.image.value = "";
    newtrail.location_id.value = "";    
}