let puppeteer = require("puppeteer");
let fs = require("fs");

let sketch2code = async () => {
    try {

        let browserInstance = await puppeteer.launch({
            headless: true,
            defaultViewport: null,
            args: ["--start-maximized"]
        });
        const page1 = await browserInstance.newPage(); // open new tab
        await page1.goto('https://sketch2code.azurewebsites.net/');
        await page1.waitForSelector('.btn.btn-main.file-upload')

        const [fileChooser] = await Promise.all([
            page1.waitForFileChooser(),
            page1.click('.btn.btn-main.file-upload'), // some button that triggers file selection
        ]);
        await page1._client.send('Page.setDownloadBehavior', {
            behavior: 'allow',
            downloadPath: __dirname + "\\results\\sketch output"
        });
        await fileChooser.accept([__dirname + '\\input\\original.png']);
        await page1.waitForSelector('#results > div:nth-child(2) > a:nth-child(1)')
        await page1.click('#results > div:nth-child(2) > a:nth-child(1)')

        let bi = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        });
        const p = await bi.newPage(); // open new tab

        setTimeout(async () => {

            await p.goto(__dirname + '\\results\\sketch output\\result.html');
        }, 2000);


    } catch (e) {
        console.log(e)
    }
}

module.exports = sketch2code