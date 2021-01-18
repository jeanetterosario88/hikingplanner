class Location{
    constructor(){
        this.submitNewLocationButton =  document.getElementById('cityForm')
        this.newLocationForm = document.getElementById('create-location')
        this.newCityInput = document.getElementById('city')
        this.modalDisplay = document.getElementById('modal')
        this.locationData = []
    }

    fetchLocations(){
        this.locationData = []
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
            fetch(LOCATIONS_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(newlocation)
        })
        .then(res => res.json())
        .then(res => {
            if (res.errors){
                let errordiv = document.getElementById("city-errors")
                errordiv.classList.remove("hidden")
                errordiv.innerHTML = res.errors[0]
                }
            else {
                this.fetchLocations() //maybe no fetch, can just render new location onto DOM
                console.log("New City Added")
            }
         })
    }


    renderLocation(location){
        return `<h3 id="${location.id}" class="city">${location.city}</h3>`
    }

    renderListofLocations(){
        document.getElementById(`locationsContainer`).innerHTML = ""
        let sorted = newLocale.sortCities() // sort the cities before rendering to page
        sorted.forEach(location => {
            document.getElementById(`locationsContainer`).innerHTML += this.renderLocation(location);
        })
    }

    searchCities(){
            let searchedcity = document.getElementById("citysear").value
            let searchcityreturn = this.locationData.filter(locale => locale.city === searchedcity)
            document.getElementById(`locationsContainer`).innerHTML = ""
            document.getElementById(`locationsContainer`).innerHTML += this.renderLocation(searchcityreturn[0])
    }

    sortCities() {
        const cityList = newLocale.locationData; // this.LocationData not working, using newLocale.LocationData, newLocale is the Location Class that was initialized, not a specific city
        const sortedCityList = cityList.sort((a,b) => {
            if (a.city > b.city) { // by city name
                return 1
            } else {
                return -1
            }
        })
        return sortedCityList
    }

    submitNewLocation(event){
        event.preventDefault() //actually don't need this, cause it's a click, not a submit event, dont need to "prevent" submit event default
        let newlocation = {city: document.getElementById('city').value}
        newLocale.addLocation(newlocation)
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
            newCard = new TrailModal(targetLocation[0]) // new Modal Class for City
            newCard.initialize()
            newLocale.modalDisplay.style.display = 'inline' //modal is no longer hidden
          })
        })

        document.getElementById("citySearch").addEventListener('click', this.searchCities.bind(this)) //.bind is binding the meaning of this in this context, when this function gets run in the code above, it will retain the meaning of this, 
        console.log(document.getElementById("citySearch"))
        this.submitNewLocationButton.addEventListener('click', this.submitNewLocation)
      }
    
      initialize() {
        newLocale.fetchLocations();
        // this.renderListofLocations();
        // this.addListeners();
      }
}


const newLocale = new Location()
document.addEventListener("DOMContentLoaded", newLocale.initialize) //don't need DOMContentLoaded b/c you have src files listed on the bottom of your HTML, HTML is read from top to bottom, so top will have exceuted anyway
let newCard;