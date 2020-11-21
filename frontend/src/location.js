class Location{
    constructor(){
        this.submitNewLocationButton =  document.getElementById('cityForm')
        this.newLocationForm = document.getElementById('create-location')
        this.newCityInput = document.getElementById('city')
        this.modalDisplay = document.getElementById('modal')
        this.locationData = []
    }

    fetchLocations(){
        fetch(LOCATIONS_URL) 
            .then(res => res.json())
            .then(res => {
                res.forEach(location => this.locationData.push(location))
            })
            .then(()=>{
                this.renderListofLocations()
                this.addListeners()
            })
    }

    addLocation(newlocation){
        console.log(newlocation)
        setTimeout(()=> {
            fetch(LOCATIONS_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(newlocation)
        })
        .then(res => res.json())
        .then(res => console.log(res, "Add Location Response"))
        .catch(error => console.log(error))
        },3000)
    }

    renderLocation(location){
        return `<h3 id="${location.id}" class="city">${location.city}</h3>`
    }

    renderListofLocations(){
        document.getElementById(`locationsContainer`).innerHTML = ""
        this.locationData.forEach(location => {
            console.log(location, "renderlistforeach")
            document.getElementById(`locationsContainer`).innerHTML += this.renderLocation(location);
        })

    }

    submitNewLocation(){
        console.log(document.getElementById('city').value)
        let newlocation = {city: document.getElementById('city').value}
        newLocale.addLocation(newlocation)
        newLocale.renderListofLocations()
        document.getElementById('city').value = ""
    }

    addListeners() {
        document.querySelectorAll('.city').forEach(element => {
          element.addEventListener('click', function(event) {
            let clickedLocationID = Number(event.target.id)
            let targetLocation = 
                newLocale.locationData.filter(location => { 
                    return clickedLocationID === location.id
            })
            let newCard = new TrailModal(targetLocation[0])
            newCard.initialize()
            newLocale.modalDisplay.style.display = 'inline'
          })
        })
    
        this.submitNewLocationButton.addEventListener('click', this.submitNewLocation)
      }
    
      initialize() {
        this.fetchLocations();
        // this.renderListofLocations();
        // this.addListeners();
      }
}


const newLocale = new Location()
newLocale.initialize()
console.log(newLocale)