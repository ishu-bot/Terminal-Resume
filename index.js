#!/usr/bin/env node
import chalk from 'chalk';
import ora from 'ora';
import cfonts from 'cfonts';
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';


let parsedData = ''
let resumeData = {}; 
let helpMode = false;


/**
 * Checks the format of the provided data.
 * @param {string} field - The field to check.
 */

async function formatChecker(field) {
    if(resumeData[field].length === 0 || resumeData[field].some(data => data === '' )){
     console.log(chalk.red('Please enter skills in the correct format, separated by commas.'));

    delete resumeData[field]

         const response = await inquirer.prompt([
            {
                type: 'input',
                name: `${field}`,
                message: `Enter ${field}:`,
            },
        ]);
     resumeData[field] = response[field].split(',').map(data => data.trim());

await formatChecker(field)
     } else {
         return
    }
}

/**
 * Creates custom fields for the resume.
 */

async function customFieldCreator() {
    
    if(helpMode){ console.log(chalk.blue('DO YOU WANT THE FIELD TO BE DISPLAYED AS A LIST OR A LINE'))
 }
    const {alignment} = await inquirer.prompt([
            {
                type: 'input',
                name: 'alignment',
                message: `Enter Alignment (LIST or LINE):`,
            },
        ]);

    if(alignment.toUpperCase() !== 'LIST' && alignment.toUpperCase() !== 'LINE') {
            
console.log(chalk.rgb(255,0,0)('ENTER CORRECT ALIGNMENT VALUES ! '))
 
      await customFieldCreator()  
          return;
    }

    const {field} = await inquirer.prompt([
            {
                type: 'input',
                name: 'field',
                message: `Enter Field:`,
            },
        ]);
    
    
    const {value} = await inquirer.prompt([
            {
                type: 'input',
                name: 'value',
                message: `Enter Value:`,
            },
        ]);

    if (!field || !value) {
    console.log(chalk.rgb(255,0,0)('Field and Value cannot be empty! Please provide valid inputs.'));
    await customFieldCreator(); // Prompt again

return;
    }

if(!resumeData[alignment.toUpperCase()]){
resumeData[alignment.toUpperCase()] = {}
    }
    
    if(alignment.toUpperCase() === 'LIST'){

        resumeData[alignment.toUpperCase()][field.toLowerCase()] = value.split(',').map(data => data.trim());

 if(resumeData[alignment.toUpperCase()][field.toLowerCase()].length === 0 || resumeData[alignment.toUpperCase()][field.toLowerCase()].some(data => data === '' )){
     console.log(chalk.red('Please enter skills in the correct format, separated by commas.'));

delete resumeData[alignment.toUpperCase()][field.toLowerCase()]
     
     await customFieldCreator()
     
 }
    }else {     resumeData[alignment.toUpperCase()][field.toLowerCase()] = value 
    }

    if(helpMode === true){ 
console.log(chalk.black('YOU CAN EXIT BY TYPING "EXIT CUSTOM" AND ENTER AND IF WANT TO CREATE MORE CUSTOM FIELDS JUST TYPE "MORE" \n'))
 }
    const {command} = await inquirer.prompt([
            {
                type: 'input',
                name: 'command',
                message: `Enter Command(EXIT CUSTOM or MORE):`,
            },
        ]);

 if(command.toUpperCase() === 'EXIT CUSTOM'){
    return
 }

    await customFieldCreator()
}


/**
 * Displays the loading spinner while fetching the resume.
 */

async function showLoadingSpinner() {
    const spinner = ora({
    text: `${chalk.yellowBright('Fetching Resume...')}`, // Color the text
    spinner: {
        interval: 400,
        frames: [
            `${chalk.rgb(255, 0, 0)('◉')}`, 
            `${chalk.hex('#FFA500')('◈')}`, 
            `${chalk.hex('#FFD700')('◉')}`, 
            `${chalk.black('◈')}`
        ]
    }
}).start();

await new Promise(resolve => {
        setTimeout(() => {
            spinner.succeed(`${chalk.hex('#00FF00')('Fetched!')}`); // Color the success message
            resolve(); // Resolve the promise when done
        }, 200);
    });
}


/**
 * Displays the user's resume.
 */

async function displayResume(){
    const dataFilePath = path.join('resumeData.json');

         cfonts.say('MY\nRESUME', {
	font: 'simple',              // define the font face
	align: 'center',              // define text alignment
	colors: ['system'],         // define all colors
	background: 'transparent',  // define the background color, you can also use `backgroundColor` here as key
	letterSpacing: 1,           // define letter spacing
	lineHeight: 0,              // define the line height
	space: true,                // define if the output text should have empty lines on top and on the bottom
	maxLength: '10',             // define how many character can be on one line
	gradient: ['red', 'yellow'], 
    // define your two gradient colors
	independentGradient: false, // define if you want to recalculate the gradient for each new line
	transitionGradient: false,  // define if this is a transition between colors directly
	rawMode: false,             // define if the line breaks should be CRLF (`\r\n`) over the default LF (`\n`)
	env: 'node'                 // define the environment cfonts is being executed in
});
if (!fs.existsSync(dataFilePath)) {

        
    
console.log(chalk.rgb(255,0,0)('⚠️  WARNING: YOU HAVE NOT STILL CREATED YOUR RESUME! , SO FIRSTLY CREATE THAT. \n \n'))

        
        const {help} = await inquirer.prompt([
            {
                type: 'input',
                name: 'help',
                message: `${chalk.blue('DO YOU NEED HELP [y/n]')}`,
            },
        ]);

    if(help.toLowerCase() === 'y'){
        helpMode = true
    }else if(help.toLowerCase() !== 'y' && help.toLowerCase() !== 'n'){
        helpMode = false
console.log(chalk.rgb(255,0,0)('ENTER CORRECT VALUES IT CAN BE EITHER y OR n, WE ARE GOING TO TAKE IT AS NO!'))
    }else {
        helpMode = false
    }
        
    if (helpMode === true) { console.log(chalk.blue(
'☝️  STEP 1: ENTER SOME COMPULSORY CRITERIAS THAT WE PROMPT YOU FOR. \n'))
    }
 const informations = ['Name','Designation', 'Description','Skills', 'Experience','Projects','Contact-Info']



        for (const info of informations) {

if(info === 'Experience'){

console.log(chalk.blue('✨ Tip: For a more beautiful resume, please enter field experience and projects in this format: "Heading - Description" with a space before and after the " - ". This will enhance the layout!'));

}
        const response = await inquirer.prompt([
            {
                type: 'input',
                name: `${info}`,
                message: `Enter ${info}:`,
            },
        ]);



 if (info === 'Skills' || info === 'Projects' || info === 'Contact-Info' || info === 'Experience') {


        resumeData[info] = response[info].split(',').map(Data => Data.trim()); 

await formatChecker(info) 
     
    } else {
resumeData[info] = response[info];
 }
        }

        if(helpMode === true) {
console.log(chalk.blue(
'✌️  STEP 2: YOU CAN ALSO HAVE SOME CUSTOM FIELDS IN YOUR RESUME ,TYPE "CUSTOM" PRESS ENTER AND IF NOT THEN TYPE "NOTHING" PRESS ENTER. \n'))  
        }
 const {something} = await inquirer.prompt([
            {
                type: 'input',
                name: 'something',
                message: `Enter Something(CUSTOM or NOTHING):`,
            },
        ]);

    if(something.toUpperCase() === 'CUSTOM'){
    
      if(helpMode === true){ console.log(chalk.hex('#FFD700')('CONGRATULATIONS! NOW YOU CAN CREATE CUSTOM FIELDS \n'))
 }
        await customFieldCreator()
    }else if (something.toUpperCase() === 'NOTHING'){
      
    if(helpMode === true){ console.log(chalk.hex('#FFD700')('GOOD WORK!\nYOUR RESUME IS READY!\nYOU CAN NOW ACCESS IT\n'))
 }
    }

        try {
fs.writeFileSync(dataFilePath, JSON.stringify( resumeData, null, 2));
} catch (error) {
    console.error(chalk.rgb(255,0,0)('Error writing resume data:', error.message));
    // Optionally, prompt to create a new resume
    }

 
    }else{
        
    try {
    const data = fs.readFileSync(dataFilePath);
    parsedData = JSON.parse(data);
} catch (error) {
    console.error(chalk.rgb(255,0,0)('Error reading resume data:', error.message));
    // Optionally, prompt to create a new resume
}
    await showLoadingSpinner()

       // Displaying user information

 console.log(chalk.blue('MY NAME IS : \n'))
        cfonts.say(parsedData['Name'], {
	font: 'tiny',              // define the font face
	align: 'center',              // define text alignment
	colors: ['system'],         // define all colors
	background: 'transparent',  // define the background color, you can also use `backgroundColor` here as key
	letterSpacing: 1.5,           // define letter spacing
	lineHeight: 0,              // define the line height
	space: true,                // define if the output text should have empty lines on top and on the bottom
	maxLength: '10',             // define how many character can be on one line
	gradient: ['red', 'yellow'], 
    // define your two gradient colors
	independentGradient: false, // define if you want to recalculate the gradient for each new line
	transitionGradient: false,  // define if this is a transition between colors directly
	rawMode: false,             // define if the line breaks should be CRLF (`\r\n`) over the default LF (`\n`)
	env: 'node'                 // define the environment cfonts is being executed in
});

       // Display available commands

console.log(chalk.blue('TO KNOW MORE ABOUT ME USE THIS COMMNANDS: \n'))
    
console.log(chalk.white('1. show name'));

console.log(chalk.black('2. show designation'));
    console.log(chalk.hex('#FFD700')('3. show description'));

console.log(chalk.rgb(255,0,0)('4. show skills'));
   console.log(chalk.cyanBright('5. show experience'));
      console.log(chalk.hex("00FF00")('6. show projects'));
    console.log(chalk.hex('#C0C0C0')('7. show contact-info'));

       // Display custom fields

let count = 8 ; 

        if (parsedData.LIST) {
        Object.keys(parsedData.LIST).forEach(Data => {
  console.log(`${count}. show ${Data.toLowerCase()}`)
    count++
});    
        }
        
if (parsedData.LINE) {
        Object.keys(parsedData.LINE).forEach(Data => {
  console.log(`${count}. show ${Data}`)
    count++
});    
                }
        
console.log(chalk.hex('#800080')('Type "exit" to quit.\n'));
 


    await handleCommands()
    }
}




/**
 * Handles user commands for displaying information.
 */

async function handleCommands(){
  
    const { command } = await inquirer.prompt([
        {
            type: 'input',
            name: 'command',
            message: 'Enter a command:',
        },
    ]);

    let found = false;
    const generalCommand = command.toLowerCase()

    switch (generalCommand) {
        case 'show name':
        
       found = true 
           cfonts.say(parsedData['Name'], {
	font: 'tiny',              // define the font face
	align: 'center',              // define text alignment
	colors: ['system'],         // define all colors
	background: 'transparent',  // define the background color, you can also use `backgroundColor` here as key
	letterSpacing: 1.5,           // define letter spacing
	lineHeight: 0,              // define the line height
	space: true,                // define if the output text should have empty lines on top and on the bottom
	maxLength: '10',             // define how many character can be on one line
	gradient: ['red', 'yellow'], 
    // define your two gradient colors
	independentGradient: false, // define if you want to recalculate the gradient for each new line
	transitionGradient: false,  // define if this is a transition between colors directly
	rawMode: false,             // define if the line breaks should be CRLF (`\r\n`) over the default LF (`\n`)
	env: 'node'                 // define the environment cfonts is being executed in
});
            break;
    case 'show designation':
    found = true 
  console.log(chalk.black(parsedData['Designation']))
            break;
    case 'show description':
    found = true 
console.log(chalk.hex('#FFD700')(parsedData['Description']));
            break;
   case 'show skills': 
        found = true     
            if (parsedData['Skills'] && Array.isArray(parsedData['Skills'])) {
        console.log(parsedData['Skills'].map(Data => chalk.rgb(255,0,0)(`- ${Data}`)).join('\n')); // Call formatting function
    } else {
        console.log(chalk.rgb(255, 0, 0)('No skills found.'));
   }
            
            break;
   case 'show experience': 
    found = true 
                if (parsedData['Experience'] && Array.isArray(parsedData['Experience'])) {
                    
 let experienceArr = '' 
for (const experience of parsedData['Experience']) {
  experienceArr = experience.split(' ')
            if(experienceArr.includes('-')){

 const index = experienceArr.indexOf('-')
   console.log(chalk.bold.cyanBright( '-' + ' ' + experienceArr.slice(0,index).join(' ')))      
console.log(chalk.cyanBright(experienceArr.slice(index+1).join(' ')) + '\n')
     
            }else {            console.log(parsedData['Experience'].map(Data => chalk.cyanBright(`- ${Data}`)).join('\n'));
        break
            }
 }
    } else {
        console.log(chalk.rgb(255, 0, 0)('No Experience found.'));
 }
            break;
   case 'show projects': 
    found = true 
            if (parsedData['Projects'] && Array.isArray(parsedData['Projects'])) {
                
 let projectArr = ''
        for (const project of parsedData['Projects']) {
   projectArr = project.split(' ')
            if(projectArr.includes('-')){

 const index = projectArr.indexOf('-')
   console.log(chalk.bold.hex("00FF00")( '-' + ' ' + projectArr.slice(0,index).join(' ')))      
console.log(chalk.hex("00FF00")(projectArr.slice(index+1).join(' ')) + '\n')
}else {            console.log(parsedData['Projects'].map(Data => chalk.hex("00FF00")(`- ${Data}`)).join('\n'));
        break
            }
    }
  
    } else {
        console.log(chalk.rgb(255, 0, 0)('No Projects found.'));
    }
    
            break;
   case 'show contact-info': 
    found = true 
              if (parsedData['Contact-Info'] && Array.isArray(parsedData['Contact-Info'])) {
        
      console.log(parsedData['Contact-Info'].map(Data => chalk.hex('#C0C0C0')(`- ${Data}`)).join('\n'));            // Call formatting function
    } else {
        console.log(chalk.rgb(255, 0, 0)('No Contact-Info found.'));
              }
            break;
    }

   // Exit command
    
    if(generalCommand === 'exit'){
        console.log(chalk.green('Exiting the program...'));
        return
    }

    if(generalCommand && generalCommand !== ''){
const exactCommand = generalCommand.substring(5)
  
if (parsedData.LIST) {  Object.keys(parsedData.LIST).forEach(Data => {
  if(Data === exactCommand){
    found = true 
      if (parsedData.LIST[exactCommand] && Array.isArray(parsedData.LIST[exactCommand])) {
        
      console.log(parsedData.LIST[exactCommand].map(Data => chalk.hex('#C0C0C0')(`- ${Data}`)).join('\n'));            // Call formatting function
                     }
  }
})
} 
 if (parsedData.LINE) { Object.keys(parsedData.LINE).forEach(Data => {
  if(Data === exactCommand){
    found = true 
      console.log(parsedData.LINE[exactCommand])
  }
});  
    }
}
  if(found === false){
        console.log('NOT FOUND! 🤔 ,ENTER A VALID COMMAND')
  }
    
    await handleCommands()
}

displayResume()