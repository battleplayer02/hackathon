'use strict';
const inquirer = require('inquirer')
const chalk = require('chalk');
const figlet = require('figlet')

const musicPlayer = require('./features/PlaySongs');
const utils = require('./features/UtilityFeatures');
const sendMail = require('./features/SendMail');
const socialMedia = require('./features/SocialMedia');
const learnDSA = require('./features/LearnDSA');
const search = require('./features/ErrorSearch');
const sketch2code = require('./features/Sketch2Code');


const choices = [
    "1. Google Search CLI",
    "2. Convert Sketch To Html",
    "3. Solve Leetcode",
    "5. Twitter",
    "6. Send a mail",
    "7. Check Weather and IPL",
    "8. Play Songs",
    "9. Play Again",
    "10 Exit",
]

const mainMenu = async () => {

    console.log(await figlet.textSync("Select an option ?".toLocaleUpperCase(), {
        font: 'digital',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        height: 30,
        whitespaceBreak: true
    }));

    console.log('\n');


    inquirer.prompt([{
                type: 'list',
                loop: false,
                name: 'choice',
                message: "Select",
                choices: choices,
            },

        ])
        .then(async answers => {
            console.log(answers)
            switch (answers.choice) {
                case "8. Play Songs": {
                    await musicPlayer()
                    break;
                }
                case "7. Check Weather and IPL": {
                    await utils()
                    break;
                }
                case "6. Send a mail": {
                    console.log(await figlet.textSync('M a i l', {
                        horizontalLayout: 'default',
                        verticalLayout: 'default',
                        width: 80,
                        height: 30,
                        whitespaceBreak: true
                    }));
                    console.log(chalk.bgRed("If You want to send mail from your mail-id then you have to configure UtilityFeatures file"));
                    await sendMail()
                    break;
                }
                case "5. Twitter": {
                    console.log(await figlet.textSync('T w i t t e r', {
                        horizontalLayout: 'default',
                        verticalLayout: 'default',
                        width: 80,
                        height: 30,
                        whitespaceBreak: true
                    }));
                    await socialMedia()
                    break;
                }
                case "3. Solve Leetcode": {
                    learnDSA()
                    break;
                }
                case "1. Google Search CLI": {
                    await search()

                    break;
                }
                case "2. Convert Sketch To Html": {
                    console.log(await figlet.textSync('Put your sketch in the inputs folder', {
                        horizontalLayout: 'default',
                        verticalLayout: 'default',
                        width: 80,
                        height: 30,
                        whitespaceBreak: true
                    }));
                    sketch2code()
                    break;
                }
                case "9. Play Again": {
                    mainMenu()
                    break
                }
            }
        })
        .catch(err => {})
}


module.exports = mainMenu