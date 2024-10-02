import express from 'express';
import path from 'path';
import fs from 'fs';

const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the directory for views (EJS templates)
app.set('views', path.join('views'));

// Serve static files (like CSS)
app.use(express.static('public'));

let parsedData = '';

function formatter(field) {
    let arr = [];
    if (parsedData[field] && Array.isArray(parsedData[field])) {
        let fieldArr = '';
        for (const data of parsedData[field]) {
            fieldArr = data.split(' ');
            if (fieldArr.includes('-')) {
                const index = fieldArr.indexOf('-');
                let object = {
                    head: fieldArr.slice(0, index).join(' '),
                    tail: fieldArr.slice(index + 1).join(' ')
                };
                arr.push(object);
            } else {
                arr.push(data);
            }
        }
    }
    return arr;
}

// Define a route to render the resume
app.get('/resume', async (_, res) => {
    const dataFilePath = path.join('resumeData.json');
    try {
        const data = fs.readFileSync(dataFilePath);
        parsedData = JSON.parse(data);
    } catch (error) {
        console.error('Error reading resume data:', error.message);
        return res.status(500).send('Error reading resume data.');
    }


    parsedData['Experience'] = formatter('Experience');
    parsedData['Projects'] = formatter('Projects');

let all = {
        name: parsedData['Name'],
        designation: parsedData['Designation'],
        description: parsedData['Description'],
        contactInfo: parsedData['Contact-Info'],
        skills: parsedData['Skills'],
        experience: parsedData['Experience'],
        projects: parsedData['Projects'],

    }

if(parsedData["LIST"]) {
Object.keys(parsedData.LIST).forEach(Data => {
   all[Data.toLowerCase()] = parsedData['LIST'][Data]
})
}

if(parsedData["LINE"]) {
Object.keys(parsedData.LINE).forEach(Data => {
   all[Data.toLowerCase()] = parsedData['LINE'][Data]
})
}



    // Render the resume template with user data
    res.render('home', {information:all});
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

