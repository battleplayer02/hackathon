const inquirer = require("inquirer");
const figlet = require('figlet');
const puppeteer = require("puppeteer");
const fs = require('fs')
const {
    exec
} = require("child_process");
const data = {
    "Algorithms": {
        "Array": {
            "Two Sum": "https://leetcode.com/problems/two-sum",
            "Reverse Integer": "https://leetcode.com/problems/reverse-integer",
        },
        "Hash Table": {
            "Count Primes": "https://leetcode.com/problems/count-primes",
            "Single Number": "https://leetcode.com/problems/single-number",
        },
        "Link List": {
            "Merge Two Sorted Lists": "https://leetcode.com/problems/merge-two-sorted-lists",
            "Remove Duplicates from Sorted List": "https://leetcode.com/problems/remove-duplicates-from-sorted-list",
        },
        "Recurssion": {},
        "Stack": {},
        "Queue": {},
        "Tree": {},
        "Binary Tree": {},
        "N-Array Tree / Generic Tree": {},
        "ALL Problems": {}
    },
    "Database": {
        "Easy": {
            "Combine Two Tables": "https://leetcode.com/problems/combine-two-tables",
            "Second Highest Salary": "https://leetcode.com/problems/second-highest-salary",
        },
        "Medium": {
            "Nth Highest Salary": "https://leetcode.com/problems/nth-highest-salary",
        },
        "Hard": {
            "Department Top Three Salaries": "https://leetcode.com/problems/department-top-three-salaries",
        },
    }
}
const uploadFileOfQuestion = async (type, link) => {
    let email = await inquirer.prompt([{
        type: 'input',
        name: 'type',
        message: 'Enter Leetcode Email-id:'
    }]);
    email = email.type;

    let passowrd = await inquirer.prompt([{
        type: 'password',
        name: 'type',
        message: 'Enter Leetcode Email-id:'
    }]);
    passowrd = passowrd.type;

    let browserInstance = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized", '--incognito', ]
    });

    let page = await browserInstance.newPage()

    await page.goto(link)
    await page.waitForSelector('#navbar-right-container > div.auth-links__3huC > a:nth-child(3)')
    await page.click('#navbar-right-container > div.auth-links__3huC > a:nth-child(3)')

    await page.type('#id_login', email, {
        delay: 100
    })
    await page.type('#id_password', passowrd, {
        delay: 100
    })
    await page.click('#signin_btn')
    await page.goto(link)
    if (type == '1') {
        let code = fs.readFileSync('./code/code.cpp')
        for (let i = 0; i < 100; i++) {
            await page.keyboard.press("Tab");
        }
        await page.evaluate((code) => {
            navigator.clipboard.writeText(code)
        }, code + "")

        page.keyboard.down('Control')
        page.keyboard.press('A')
        page.keyboard.up('Control')

        page.keyboard.down('Control')
        page.keyboard.press('V')
        page.keyboard.up('Control')

        page.click('div button[data-cy="submit-code-btn"]')

    } else {
        let code = fs.readFileSync('./code/code.java')
        for (let i = 0; i < 100; i++) {
            await page.keyboard.press("Tab");
        }
        await page.evaluate((code) => {
            navigator.clipboard.writeText(code)
        }, code + "")

        page.keyboard.down('Control')
        page.keyboard.press('A')
        page.keyboard.up('Control')

        page.keyboard.down('Control')
        page.keyboard.press('V')
        page.keyboard.up('Control')

        page.click('div button[data-cy="submit-code-btn"]')

    }
}


let executeCommand = (command) => {
    exec(command, (error, stdout, stderr) => {
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
}
const topics = Object.keys(data)



let submitQuestion = async (link) => {
    await inquirer.prompt([{
        type: 'list',
        loop: false,
        name: 'choice',
        message: "Select the topic: ?",
        choices: ['1. 📝C++', '2. ☕JAVA']
    }]).then(async ans => {
        let type = ans.choice.split('')[0];
        type == '1' ? await executeCommand('notepad code/code.cpp') : await executeCommand('notepad code/code.java')
        await inquirer.prompt([{
            type: 'list',
            loop: false,
            name: 'choice',
            message: "Select the topic: ?",
            choices: ['✔ Done', '📝 Edit Again']
        }]).then(ans => {
            ans.choice.split('')[0] == '✔' ? uploadFileOfQuestion(type, link) : submitQuestion()
        })
    })
}

console.log(topics);

function print(text) {
    console.log(figlet.textSync(text, {
        font: "cybermedium",
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        height: 30,
        whitespaceBreak: true
    }));
}

const learnDSA = () => {

    print('Select Topic: ')

    inquirer.prompt([{
        type: 'list',
        loop: false,
        name: 'choice',
        message: "Select the topic: ?",
        choices: topics
    }]).then(ans1 => {
        print('Select Sub-Topic')
        inquirer.prompt([{
            type: 'list',
            loop: false,
            name: 'choice',
            message: "Select the sub topic: ?",
            choices: Object.keys(data[ans1.choice])
        }]).then(ans2 => {

            let subTopic = data[ans1.choice]
            print('Select Question: ')
            inquirer.prompt([{
                type: 'list',
                loop: false,
                name: 'choice',
                message: "Select the sub topic: ?",
                choices: Object.keys(subTopic[ans2.choice])
            }]).then(ans3 => {
                let questions = subTopic[ans2.choice]
                let link = questions[ans3.choice]

                print('Select: ');
                inquirer.prompt([{
                    type: 'list',
                    loop: false,
                    name: 'choice',
                    message: "Select the topic: ?",
                    choices: ['1.Open In Browser', '2.Submit Answer', '3.Question Video']
                }]).then(async ans => {
                    let com = ans.choice.split('')[0]
                    // console.log(com);
                    switch (com) {
                        case '1': {

                            let browserInstance = await puppeteer.launch({
                                headless: false,
                                defaultViewport: null,
                                args: ["--start-maximized"]
                            });
                            let page = await browserInstance.newPage()
                            await page.goto(link)

                            break;
                        }
                        case '2': {
                            console.log(2);
                            print("Select Language: ")
                            await submitQuestion(link);
                            break;
                        }
                        case '3':
                            console.log(3);
                            break;

                        default:
                            break;
                    }
                })

            })

        })

    })
}



// learnDSA()

module.exports = learnDSA