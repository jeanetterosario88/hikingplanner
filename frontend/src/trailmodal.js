class TrailModal {
    constructor(location){
        this.trails = location.trails;
        this.location = location;
        this.readmoreclicked = false;
    }

    renderTrailCardtoModal(trail, cardFromForm=false){
        return `
        <div class="trailcard ${cardFromForm ? "blue-background" : ""}">
            <h4>${trail.name}</h4>
            <p id="fulldescription-${trail.id}" class="hidden">
                Description: ${trail.description}
                <span id="readLess-${trail.id}" class="readread" data-trail-id=${trail.id}>...Read Less</span>
            </p> 
            <p id="shortdescription-${trail.id}">
                Description: ${trail.description.slice(0, 25)} 
                <span id="readread-${trail.id}" class="readread" data-trail-id=${trail.id}>...Read More</span>
            </p>
            <p>Difficulty: ${trail.difficulty}</p>
            <p id = "traillikes-${trail.id}">Likes: ${trail.likes}</p>
            <span id="addlikes-${trail.id}" class="addlikes">&#x1f44d;</span>
        </div> `
    }

    renderAllCards(){
        this.trails.forEach(trail =>{
            document.getElementById("trailcards").innerHTML += this.renderTrailCardtoModal(trail)
        })
    }
 
    displaytrailform(){
        let trailForm = document.getElementById("newTrail");
        //Step 1: hide the trail cards
        document.getElementById("trailcards").classList.add("hidden");
        //Step 2: Show the form
        trailForm.classList.remove("hidden");
        //Step 3: Fill in hidden field of "location_id"
        document.getElementById("trail-location-id").value = newCard.location.id;
        // //Step 4: Change/update heading for forms
        document.getElementById("trail-location-name").textContent = newCard.location.city;
        // //Step 5: Add an eventListener to the new Trail form sumbit that will handle the submit (in its own function)
        //trailForm.addEventListener("submit", submitNewTrail)
    }

        submitNewTrail(event){
            event.preventDefault();
             const location_id = event.target.location_id.value
             const formData = {
                        name: event.target.name.value,
                        difficulty: event.target.difficulty.value,
                        description: event.target.description.value,
                        image: event.target.image.value,
                        location_id: location_id
                     }
            newCard.addNewTrail(formData)
        }

        addNewTrail(formData){
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
                        if (res.errors){
                            let errordiv = document.getElementById("trail-errors")
                            errordiv.classList.remove("hidden")
                            res.errors.forEach(error => {
                                let errorline = document.createElement("p")
                                errorline.innerHTML = error
                                errordiv.appendChild(errorline)
                            })
                        } else {
                            const newTrailInfo = res.data.attributes;
                            //hide the form
                            this.resetModal();
                            //then we append the new trail on the modal as a trail card as the first card (top of the list)
                            document.getElementById("trailcards").innerHTML = this.renderTrailCardtoModal(newTrailInfo, true) + document.getElementById("trailcards").innerHTML
                            //and make the new trail card styled (blue background) with a specific class
                            this.trails.push(newTrailInfo);
                        }
                    })
            }

        resetModal(){
            let newtrail = document.getElementById("newTrail");
            newtrail.classList.add("hidden")
            document.getElementById("trailcards").classList.remove("hidden");
            newtrail.name.value = "";
            newtrail.description.value = "";
            newtrail.image.value = "";
            newtrail.location_id.value = "";
            const radioBtns = newtrail.querySelectorAll('input[type="radio"]');
            radioBtns.forEach(btn => btn.checked = false);
            let errordiv = document.getElementById("trail-errors");
            errordiv.querySelectorAll('p').forEach(p => p.remove())
        }


        handleAddLike(event){
            console.log(event.target.id, "handleAddLike")
            let trailID = Number(event.target.id.slice(9, 11)) //can use parseInt
            fetch(`${TRAILS_URL}/${trailID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
            })
            .then(res => res.json())
            .then(res => {
                    document.getElementById(`addlikes-${trailID}`).innerHTML = "+1";
                    document.getElementById(`traillikes-${trailID}`).innerHTML = `Likes: ${res.data.attributes.likes}`;
                    document.getElementById(`addlikes-${trailID}`).removeEventListener("click", newCard.handleAddLike);
                    let newCardTrail = newCard.trails.find(trail => res.data.attributes.id === trail.id);
                    newCardTrail.likes = res.data.attributes.likes; //reassignment, changes original
            })
    }

        addListeners() {
            document.getElementById("closeModal").addEventListener("click", function(event){ //close the Modal
                document.getElementById("modal").style.display = "none" //entire model will display "none" aka disappear
                document.getElementById("trailcards").innerHTML = "" //remove modal content to start over
                newCard.resetModal();
            })
            document.querySelectorAll(".addlikes").forEach(eachlikebutton => {
                 // same as line 62  //like id, ex.addlikes-5, 9th and 10th, starts at 0, doesn't include 11
                eachlikebutton.addEventListener('click', newCard.handleAddLike) //in location.js, newCard, new instance of Trail Modal
             })

            document.getElementById("newTrailBtn").addEventListener("click", this.displaytrailform);

            document.getElementById("newTrail").addEventListener("submit", this.submitNewTrail);
            

            document.querySelectorAll(".readread").forEach(eachreadread => {
                eachreadread.addEventListener('click', (event) => this.readToggle(event))
            })
             
        }

        readToggle(event){
            let trailID = Number(event.target.dataset.trailId)
            if (this.readmoreclicked === false){
                document.getElementById(`shortdescription-${trailID}`).classList.add("hidden");
                document.getElementById(`fulldescription-${trailID}`).classList.remove("hidden");
                this.readmoreclicked = true
            } else{
                document.getElementById(`shortdescription-${trailID}`).classList.remove("hidden");
                document.getElementById(`fulldescription-${trailID}`).classList.add("hidden");
                this.readmoreclicked = false
            }
                    

        }

    initialize(){
        this.renderAllCards()
        this.addListeners()
    }
}
