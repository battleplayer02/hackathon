const {
    exec
} = require("child_process");

'use strict';
const inquirer = require('inquirer')

const choices = [
    "play               Play the song",
    "pause|stop         Pause the song",
    "toggle             Toggle the song",
    "next               Next song",
    "backward           Previous song",
    "state              Get player state",
    "subreddits [subs]  Get or set subreddits",
    "user               Get user information",
    "song               Get song information",
    "*                  Help",
    "exit menu"
]

let musicPlayer = () =>
    inquirer.prompt([{
        type: 'list',
        loop: false,
        name: 'choice',
        message: "Select what do you want to do ?",
        choices: choices
    }]).then(ans => {
        ans = ans.choice.split(" ")[0]
        executeCommand(ans)
        if (ans !== 'exit')
            musicPlayer()
    })


let executeCommand = (command) => {
    exec("musicplayer " + command, (error, stdout, stderr) => {
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

// musicPlayer()

module.exports = musicPlayer