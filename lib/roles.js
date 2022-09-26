class Roles {
    constructor(title, salary, DepartmentId) {

        // Title
        if (title === "" || title === undefined || title === null) {
            throw new Error("Title of the empolyee was not entered");
        }
        this.title = title;

        //Salary
        if (salary === "" || salary === undefined || salary === null) {
            throw new Error("Salary was not entered");
        }
        this.salary = salary;
         // console.log(typeof DepartmentId)
         if (typeof this.salary !== "number" || isNaN(this.salary) || this.salary < 0) {
            throw new Error("Salary needs to be positive integer");
          }

        // Department ID
        if (DepartmentId === "" || DepartmentId === undefined || DepartmentId === null) {
            throw new Error("Department ID was not entered");
        }
        this.DepartmentId = parseInt(DepartmentId);
        // console.log(typeof DepartmentId)
        if (typeof this.DepartmentId !== "number" || isNaN(this.DepartmentId) || this.DepartmentId < 0) {
            throw new Error("Department ID needs to be positive integer");
          }
    }
}

module.exports = Roles;