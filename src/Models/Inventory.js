
export default class Inventory {
    constructor(householdId, categories = []) {
        this.householdId = householdId;
        this.categories = categories;
    }
}

export class Category {
    constructor(name,ingredients = []) {
        this.name = name;
        this.ingredients = ingredients;
    }
}