class Department {
    constructor(DepartmentName) {
        this.DepartmentName = DepartmentName;
        console.log(typeof DepartmentName);
    }
  
    getDepartmentName() {
      console.log(`My department is ${this.DepartmentName}`);
      return this.DepartmentName;
    }
  }
  module.exports = Department;