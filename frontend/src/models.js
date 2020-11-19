class Location{
    constructor(name, trails){
        this.name = name
        this.trails = trails
    }

    addTrail(name, difficulty, description, image, likes){
       this.trails.push(new Trail(name, difficulty, description, image, likes))
    }

}

class Trail{
    constructor(name, difficulty, description, image, likes){
        this.name = name
        this.difficulty = difficulty
        this.description = description
        this.image = image
        this.likes = likes
    }

}

// const boulder = new Location("Boulder, Colorado", [])
//     boulder.addTrail("HappyTrail", "Moderate", "descdescdescdescdesc", "https://www.desc.com", 0)
//     console.log(boulder)

