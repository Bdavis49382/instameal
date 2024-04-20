
export default class Recipe {
    constructor(name, householdId, ingredients, rating, picture,timesMade=0, lastMadeTimeStamp=null) {
        this.name = name;
        this.houseHoldId = houseHoldId;
        this.ingredients = ingredients;
        this.rating = rating;
        this.picture = picture;
        this.timesMade = timesMade;
        this.lastMadeTimeStamp = lastMadeTimeStamp;
    }
}