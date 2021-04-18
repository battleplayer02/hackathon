
var prompt = inquirer.createPromptModule();
prompt().then(answers => {
    log(answers)
}).catch(error => {
    if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
    } else {
        // Something else went wrong
    }
});

/**
 * Checkbox list examples
 */
