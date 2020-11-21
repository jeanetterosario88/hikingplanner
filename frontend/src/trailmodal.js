class TrailModal {
    constructor(location){
        this.trails = location.trails
    }

    renderTrailCardtoModal(trail){
        return `
        <div class="trailcard">
            <h4>${trail.name}</h4>
            <p id="fulldescription>Description: ${trail.description}</p>
            <p id="shortdescription>Description: ${trail.description.slice(0, 25)} <span class="readread">...Read More</span></p>
            <p>Difficulty: ${trail.difficulty}</p>
            <p id = "traillikes-${trail.id}">Likes: ${trail.likes}</p>
        </div> `
    }

    renderAllCards(){
        this.trails.forEach(trail =>{
            document.getElementById("trailcards").innerHTML += this.renderTrailCardtoModal(trail)
        })
    }

    initialize(){
        this.renderAllCards()
    }

}