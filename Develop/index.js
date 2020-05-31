const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
const util = require("util");
const api = require("./utils/api");
const genMkDwn = require("./utils/generateMarkdown");

const writeToFile = util.promisify(fs.writeFile);

const questions = [
    {
        type: "input",
        name: "fileName",
        message: "Please type in the filname for your Readme."
    },

    {
        type: "input",
        name: "userName",
        message: "What is your Github user name?"
    },
    
    {
        type: "input",
        name: "email",
        message: "What is your email?"
    },
    
    {
        type: "input",
        name: "projTitle",
        message: "Please enter the title of your project."
    },
    

    {
        type: "input",
        name: "projDescr",
        message: "Please enter a summary of your project."
    },

    
    {
        type: "input",
        name: "use",
        message: "Please enter the project's intended use."
    },

    
    {
        type: "input",
        name: "installInstr",
        message: "Please enter any installation instructions."
    },


    {
        type: "list",
        name: "license",
        message: "Do you require a license?",
        choices: ["yes","no"]
    },


    {
        type: "input",
        name: "contribs",
        message: "Please list any contributors."
    },

    
    {
        type: "input",
        name: "tests",
        message: "Please enter any tests that may be required."
    }

];

function promptUser() {
    return inquirer.prompt(questions);
}

async function init() {
    console.log("Welcome to my Readme Generator");

    try {
        const answers = await promptUser();

        const queryURL = api.getUser(answers);

        axios.get(queryURL).then(function (res) {
            console.log("Currently Generating a README for this project."+`${answers.fileName}.md`);

            const mkDwn = genMkDwn(answers);

            writeToFile(`${answers.fileName}.md`, mkDwn);

            console.log("README successfully generated!");
        });

    } catch (err) {
        console.log(err);
    }
}

init();
