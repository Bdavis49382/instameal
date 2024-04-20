
export default class User {
    constructor(id, name, email, householdId=0) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.householdId = householdId === 0 ? id : householdId;
    }
}