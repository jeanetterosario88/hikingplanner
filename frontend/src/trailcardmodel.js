window.addEventListener("DOMContentLoaded", function(){
    class TrailCard{
        constructor(){
              this.traildiv = document.createElement("div")
              this.trailtitle = document.createElement("h4")
              this.trailsummary = document.createElement("p")   
              this.trailsummaryshort = document.createElement("p")
              this.traildifficulty = document.createElement("p")
              this.traillikes = document.createElement("p")
              this.trailcards = document.getElementById("trailcards")
              this.addlikes = document.createElement("span")
              this.readmore = document.createElement("span")
              this.readless = document.createElement("span")
        }
    
        addAttribute(element, attr, value){
            element.setAttribute(attr, value)
        }
    
        addInnerHTML(element, value){
            element.innerHTML = value
        }
    
        appendElement(parent, element){
            parent.appendChild(element)
        }
    
    }
    
    const example = new TrailCard()
    console.log(example)

})