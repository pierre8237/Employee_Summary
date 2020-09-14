const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const Engineer = require("./lib/Engineer.js");
const Manager = require("./lib/Manager.js");
const Intern = require("./lib/Intern.js");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
let employees = [];

function selectRole() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "Which type of team member would you like to add?",
        choices: ["Manager", "Engineer", "Intern"],
      },
      {
        type: "input",
        name: "name",
        message: "Please enter your name.",
      },
      {
        type: "input",
        name: "id",
        message: "What is your employee id number?",
      },
      {
        type: "input",
        name: "email",
        message: "What is your email address?",
      },
    ])
    .then((answers) => {
      let role = answers.role;
      let name = answers.name;
      let id = answers.id;
      let email = answers.email;
      if (answers.role === "Manager") {
        inquirer
          .prompt([
            {
              type: "input",
              name: "officeNumber",
              message: "What is your office number?",
            },
          ])
          .then((answers) => {
            let officeNumber = answers.officeNumber;
            const manager = new Manager(name, id, email, officeNumber, role);
            employees.push(manager);
            renderNewEmployee();
            addNewEmployee();
          });
      } else if (answers.role === "Engineer") {
        inquirer
          .prompt([
            {
              type: "input",
              name: "github",
              message: "What is your GitHub user name?",
            },
          ])
          .then((answers) => {
            let github = answers.github;
            const engineer = new Engineer(name, id, email, github, role);
            employees.push(engineer);
            renderNewEmployee();
            addNewEmployee();
          });
      } else {
        inquirer
          .prompt([
            {
              type: "input",
              name: "school",
              message: "What is the name of your school?",
            },
          ])
          .then((answers) => {
            let school = answers.school;
            const intern = new Intern(name, id, email, school, role);
            employees.push(intern);
            renderNewEmployee();
            addNewEmployee();
          });
      }
      function addNewEmployee() {
        inquirer
          .prompt([
            {
              type: "confirm",
              name: "newTeamMember",
              message:
                "Would you like to add another Team Member to the roster?",
              default: false,
            },
          ])
          .then((answer) => {
            let name = answer.newTeamMember;
            if (name === true) {
              selectRole();
            } else {
              return;
            }
          });
      }
    });
}
selectRole();

function renderNewEmployee() {
  fs.writeFileSync(outputPath, render(employees), "utf-8");
}
renderNewEmployee();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
//
