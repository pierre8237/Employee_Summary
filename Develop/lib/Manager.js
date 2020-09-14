// // TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");
class Manager extends Employee {
  constructor(name, id, email, officeNumber, role) {
    super(name, id, email, role);
    this.officeNumber = officeNumber;
  }
  getName() {
    return this.name;
  }
  getId() {
    return this.id;
  }
  getEmail() {
    return this.email;
  }
  getRole() {
    return "Manager";
  }
  getOfficeNumber() {
    return this.officeNumber;
  }
}

module.exports = Manager;
