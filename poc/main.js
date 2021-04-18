'use strict';
const inquirer = require('inquirer')
const chalk = require('chalk');
const figlet = require('figlet');
const {
    exec
} = require('child_process');



let mainMenu = require('./sub_modules/mainMenu');

exec("cls", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});


const log = console.log;
figlet(" B a s i c  U t i l i t i e s  CLI App", {
    font:'doom',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    whitespaceBreak: false
}, (err, data) => {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    log(chalk.bgBlue(`*****************************************************************************************************************************`))
    console.log(chalk.white.bold.bgCyan(data))
    log(chalk.bgBlue(`*****************************************************************************************************************************`))
    log(chalk.bgBlue(``))
    mainMenu()
})