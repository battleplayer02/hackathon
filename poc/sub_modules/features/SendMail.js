'use strict';
const inquirer = require('inquirer')
var nodemailer = require('nodemailer');

const sendMail = async () => {
    let to = await inquirer.prompt([{
        type: 'input',
        name: 'type',
        message: 'Enter the receiver\'s Email::'
    }]);
    to = to.type;

    let sub = await inquirer.prompt([{
        type: 'input',
        name: 'type',
        message: 'Enter Subject:'
    }]);

    sub = sub.type;

    let mailBody = await inquirer.prompt([{
        type: 'input',
        name: 'type',
        message: 'Enter Mail Body:'
    }]);
    mailBody = mailBody.type;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "hshekhar499@gmail.com",
            pass: 'Secured@ccount123'
        }
    });
    const mailOptions = {
        from: "hshekhar499@gmail.com",
        to: to,
        subject: sub,
        html: mailBody
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            console.table(info);
    });
}

module.exports = sendMail