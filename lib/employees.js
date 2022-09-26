class Employees {
    constructor(firstName, lastName, rolesId) {
        if (firstName === "" || firstName === undefined || firstName === null) {
            throw new Error("First name of the empolyee was not entered");
        }
        this.firstName = firstName;

        //Last Name of th empolyee
        if (lastName === "" || lastName === undefined || lastName === null) {
            throw new Error("Last name of the empolyee was not entered");
        }
        this.lastName = lastName;
         
        // Roles ID
        if (rolesId === "" || rolesId === undefined || rolesId === null) {
            throw new Error("Role ID was not entered");
        }
        this.rolesId = parseInt(rolesId);
        // console.log(typeof rolesId)
        if (typeof this.rolesId !== "number" || isNaN(this.rolesId) || this.rolesId < 0) {
            throw new Error("Role ID needs to be positive integer");
          }
    }
       
    }

module.exports = Employees;