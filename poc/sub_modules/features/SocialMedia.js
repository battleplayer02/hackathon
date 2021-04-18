'use strict';
const inquirer = require('inquirer')
let puppeteer = require("puppeteer");
let scrollPageToBottom = require('puppeteer-autoscroll-down')
const jsoncsv = require('json-csv')
const fs = require('fs')

let socialMedia = () => {
    inquirer.prompt([{
        type: 'list',
        loop: false,
        name: 'choice',
        message: "Select what do you want to do ?",
        choices: [
            'Twitter POST',
            'Explore Trending Page'
        ],
    }]).then(async ans => {
        if (ans.choice == 'Twitter POST') {
            await twitterPost()
        } else if (ans.choice == 'Explore Trending Page') {
            await trending()
        }

    })
}

const trending = async () => {
    let browserInstance = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"]
    });
    let page = await browserInstance.newPage()
    await page.goto("https://twitter.com/explore/tabs/trending")

    await page.waitForSelector('div[data-testid="trend"]')
    let trends = await page.evaluate(() => {
        let arr = []
        let headings = document.querySelectorAll(`div[data-testid="trend"] > div > div:first-child`)
        let hashtags = document.querySelectorAll(`div[data-testid="trend"] > div > div:nth-child(2)`)
        let not = document.querySelectorAll(`div[data-testid="trend"] > div > div[data-testid='metadata']`)
        for (let i = 0; i < not.length; i++) {
            arr.push({
                heading: headings[i].innerText,
                'Number Of Tweets': not[i].innerText,
                Hashtag: hashtags[i] == undefined ? '' : hashtags[i].innerText
            })
        }
        return arr
    }, '');
    console.table(trends)
    fs.writeFileSync('./results/trends.json', JSON.stringify(trends))
}

const twitterPost = async () => {

    let email = await inquirer.prompt([{
        type: 'input',
        name: 'type',
        message: 'Enter your search email:'
    }]);
    email = email.type;
    let password = await inquirer.prompt([{
        type: 'password',
        name: 'type',
        message: 'Enter your password'
    }]);
    password = password.type

    try {
        let browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        });
        const page = await browser.newPage();        // open new tab
        await page.goto('https://www.twitter.com')
        await page.waitForSelector("a[data-testid='loginButton']")
        await page.click("a[data-testid='loginButton']")
        await page.waitForSelector("input[type='text']")
        await page.waitForSelector("input[type='password']")
        await page.type("input[type='text']", email, {delay: 100})
        await page.type("input[type='password']", password, {delay: 100})
        await page.click("div[role='button']")
    } catch (err) {
        console.log(err);
    }

}



// socialMedia()

module.exports = socialMedia
