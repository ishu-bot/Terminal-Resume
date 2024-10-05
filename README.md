# Terminal Resume

## Description

**Terminal Resume** is a user-friendly resume creator package that allows you to generate resumes with different templates and themes directly from your terminal. It provides a flexible and simple interface for adding custom fields, making it an easy-to-use alternative to traditional resume creation tools.

## Features

- Create resumes with multiple themes: Classic Light, Pastel Dream, Neon Dark.
- Add custom fields to your resume.
- View your resume in the terminal with a clean and organized layout.
- Easy installation and setup via npm.
- Interactive prompts for user input.

## Installation

You can install **Terminal Resume** globally or locally using npm. Here’s how:

### Global Installation

To install the package globally, run:

```bash
npm install -g terminal-resume

```

### Local Installation

To install the package locally, run:

```bash
npm install terminal-resume
```

## Usage

### For creating and showing your resume on CLI
After installation, you can create your resume by running the following command in your terminal:

```bash
npx terminal-resume
```

Follow the interactive prompts to enter your information, including name, designation, skills, experience, and more.

And after creating your resume Rerun the same command to show up your resume on CLI

```bash
npx terminal-resume
```
Don't worry about the resume data persistence it will be persisted in your personal file system in a file called resumeData.json

### For viewing your resume in browser's preview
Also you can view your created resume in a pre-created template by running the following command:

```bash
npx resume
```

This will actually start a server on which your resume will be hosted you can view it in your browser's preview on that particular port number

### Example Commands

- To show your name:

```bash
show name
```

- To show your skills:

```bash
show skills
```

- To clear the existing resume data:

```bash
clear
```

## Themes

You can select different themes for your resume:

- Classic Light (default)
- Pastel Dream
- Neon Dark
  
Select a theme from the dropdown menu in your resume.

## Templates
You can also select different templates for your resume:

- Classic Elegance
- Vibrant Modern

Select a template when prompted during the initial information taking process.

### NOTE
I want people to contribute more templates in this project so that, This package can have a more variety of templates to be used by different users according to their fit.

## Custom Fields 

You can also add custom fields to your resume. When prompted, type "CUSTOM" to create custom fields or "NOTHING" to proceed without them.

## Contributing

Contributions are welcome! If you would like to contribute to Terminal Resume, please follow these steps:
1. Fork the repository.
2. Create a new branch (git checkout -b feature/YourFeature).
3. Make your changes and commit them (git commit -m 'Add some feature').
4. Push to the branch (git push origin feature/YourFeature).
5. Open a Pull Request.


## Licence 

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Express - Fast, unopinionated, minimalist web framework for Node.js.
- EJS - Embedded JavaScript templating.
- Chalk - Terminal string styling done right.
- Inquirer - A collection of common interactive command line user interfaces.

## Contact

For questions or feedback, feel free to reach out:
Author: Ishu Gupta
Email: devishu547@gmail.com
GitHub: ishu-bot
Happy coding! 🎉
