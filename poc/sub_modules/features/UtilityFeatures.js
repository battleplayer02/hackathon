'use strict';
const inquirer = require('inquirer')
const puppeteer = require("puppeteer");
const unirest = require("unirest");
const chalk = require('chalk');
const figlet = require('figlet')
const {
    exec
} = require("child_process");

let utils = async () => {

    let choice = await inquirer.prompt([{
        type: 'list',
        loop: false,
        name: 'choice',
        message: "Select ?",
        choices: ['Check Weather', 'IPL Data'],
    }])
    choice = choice.choice
    if (choice == "Check Weather") {
        console.log(await figlet.textSync('C h e c k   W e a t h e r', {
            horizontalLayout: 'default',
            verticalLayout: 'default',
            width: 80,
            height: 30,
            whitespaceBreak: true
        }));
        await checkWeather()
    } else if (choice == 'IPL Data') {
        console.log(await figlet.textSync('I P L  2021', {
            horizontalLayout: 'default',
            verticalLayout: 'default',
            width: 80,
            height: 30,
            whitespaceBreak: true
        }));
        await cricketScore()
    }

}

const checkWeather = async () => {

    var req = unirest("GET", "https://community-open-weather-map.p.rapidapi.com/weather");
    let loc = await inquirer.prompt([{
        type: 'input',
        name: 'type',
        message: 'Enter your Location:'
    }]);
    loc = loc.type;
    var req = unirest("GET", "https://community-open-weather-map.p.rapidapi.com/weather");
    req.query({
        "q": loc,
        "lat": "0",
        "lon": "0",
        "id": "2172797",
        "lang": "null",
        "units": "\"metric\" or \"imperial\"",
        "mode": "xml, html"
    });

    req.headers({
        "x-rapidapi-key": "dc8173212fmsh8d9d03f3c821075p1e5111jsn159316527c50",
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        "useQueryString": true
    });


    req.end(async function (res) {
        if (res.error) throw new Error(res.error);

        let yn = await inquirer.prompt([{
            type: 'input',
            name: 'type',
            message: 'Print Full JSON: (Y/N)'
        }]);

        if (yn.type === 'Y' || yn.type == 'y') {
            console.log(res.body);
        }

        let result = res.body;
        console.log(chalk.bgBlue.bold("Location:"), result.name)
        console.log(chalk.bgBlue.bold("Weather:"))
        console.table(result.weather)
        console.log(chalk.bgBlue.bold("Wind:"))
        console.table(result.wind)



    });

}

const cricketScore = async () => {
    try {
        inquirer.prompt([{
            type: 'list',
            loop: false,
            name: 'choice',
            message: "Select ?",
            choices: ['Stats', 'Points Table', 'All Matches', 'Live (Latest match) Score and Summery '],
        }]).then(async ans => {
            console.log("Loading...")
            if (ans.choice === 'Stats') {
                await generageStatsPdf()
            } else if (ans.choice === 'Points Table') {
                await generatePointsTablePdf()
            } else if (ans.choice === 'All Matches') {
                console.log("All Matches")
                await allMatchesPdf()
            } else if (ans.choice === 'Live (Latest match) Score and Summery ') {
                await latestMatch()
            }
        })
    } catch (e) {
        console.log(e)
    }
}


const generageStatsPdf = async () => {
    let browserInstance = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
        args: ["--start-maximized"]
    });
    let page = await browserInstance.newPage();
    page.goto('https://www.google.com/search?q=live+ipl+score&rlz=1C1UEAD_enIN928IN928&oq=live+ipl+score&aqs=chrome..69i57j0i131i433j0i20i131i263i433j0i131i433l3j0i3j69i60.3273j1j7&sourceid=chrome&ie=UTF-8#sie=lg;/g/11fqtnjjg0;5;/m/03b_lm1;lb;fp;1;;')
    await page.waitForNavigation()

    await page.pdf({
        path: __dirname  + "/results/stats.pdf",
        format: 'A4'
    })
    browserInstance.close()
    await browserInstance.close()
    let bi = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"]
    });
    let p = await bi.newPage();
    await p.goto("file:///" + __dirname + "/results/stats.pdf")
}
const latestMatch = async () => {
    let browserInstance = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
        args: ["--start-maximized"]
    });
    let page = await browserInstance.newPage();
    page.goto('https://www.cricbuzz.com/live-cricket-scores/35642/9th-match-indian-premier-league-2021')
    await page.waitForNavigation()

    await page.pdf({
        path: __dirname  + "/results/latestMatch.pdf",
        format: 'A4'
    })
    await browserInstance.close()
    let bi = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"]
    });
    let p = await bi.newPage();
    await p.goto("file:///" + __dirname  + "/results/latestMatch.pdf")
}

const generatePointsTablePdf = async () => {
    let browserInstance = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
        args: ["--start-maximized"]
    });
    let page = await browserInstance.newPage();
    page.goto("https://www.google.com/search?q=live+ipl+score&rlz=1C1UEAD_enIN928IN928&oq=live+ipl+score&aqs=chrome..69i57j0i131i433j0i20i131i263i433j0i131i433l3j0i3j69i60.3273j1j7&sourceid=chrome&ie=UTF-8#sie=lg;/g/11fqtnjjg0;5;/m/03b_lm1;st;fp;1;;")
    await page.waitForNavigation()

    await page.pdf({
        path: __dirname  + "/results/pointsTable.pdf",
        format: 'A4'
    })
    await browserInstance.close()
    let bi = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"]
    });
    let p = await bi.newPage();
    await p.goto("file:///" + __dirname + "/results/pointsTable.pdf")
}

const allMatchesPdf = async () => {
    let browserInstance = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
        args: ["--start-maximized"]
    });
    let page = await browserInstance.newPage();
    await page.goto("https://www.espncricinfo.com/series/ipl-2021-1249214/match-schedule-fixtures", {
        waitUntil: 'networkidle2'
    })

    await page.pdf({
        path: __dirname  + "/results/allMatches.pdf",
        format: 'A4'
    })
    await browserInstance.close()
    let bi = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"]
    });
    let p = await bi.newPage();

    await p.goto("file:///" + __dirname + "/results/allMatches.pdf")
}



// utils()
module.exports = utils