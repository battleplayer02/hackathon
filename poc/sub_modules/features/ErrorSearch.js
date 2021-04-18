'use strict';
const inquirer = require('inquirer')
const puppeteer = require('puppeteer');
var unirest = require("unirest");
const fs = require('fs')
const path = require('path')
const figlet = require('figlet')



module.exports = async () => {
    try {

        console.log(await figlet.textSync('Google Search', {
            horizontalLayout: 'default',
            verticalLayout: 'default',
            width: 80,
            height: 30,
            whitespaceBreak: true
        }));

        let question = await inquirer.prompt([{
            type: 'input',
            name: 'type',
            message: 'Enter your search question'
        }])

        let ans = await inquirer.prompt([{
            type: 'checkbox',
            name: 'type',
            message: 'Where do you want to get results :',
            choices: ['Open In CLI'],
        }])

        question = question.type;
        ans = ans.type[0];
        console.log(ans)
        searchInCli(ans, question)

        // if (ans === 'Open In Chrome') {
        //     console.log(456)
        //     openInChrome(ans, question)
        // } else if (ans === 'Open In CLI') {
        // }

        console.log(await figlet.textSync('Check Results Folder For Your Search', {
            horizontalLayout: 'default',
            verticalLayout: 'default',
            width: 80,
            height: 30,
            whitespaceBreak: true
        }));
    } catch (e) {
        // console.log(e)
    }
}



function searchInCli(ans, ques) {


    var req = unirest("GET", "https://google-search3.p.rapidapi.com/api/v1/search/q=" + ques);

    req.headers({
        "x-rapidapi-key": "dc8173212fmsh8d9d03f3c821075p1e5111jsn159316527c50",
        "x-rapidapi-host": "google-search3.p.rapidapi.com",
        "useQueryString": true
    });


    req.end(function (res) {
        if (res.error) throw new Error(res.error);

        // console.log(res.body.results);
        let pathFile = path.join(__dirname + '/results/search.json')
        fs.writeFileSync(pathFile, JSON.stringify(res.body.results))
        for (let i = 0; i < res.body.results.length; i++) {
            console.table([res.body.results[i]])
            console.log('\n\n\n\n')
        }
    });

}