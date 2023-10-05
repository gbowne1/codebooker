# Developer Environment Setup

This section contains information that will help you:

- [Clone this project](#clone);
- Set up this project in your IDE or editor;
- Set up your working environment, including any environment variables, yarn/npm/pnpm package(s), editor extensions or plugins needed;
- Set up the connection to the database;
- Set up the local development database, MongoDB.

## Getting Started with Create React App

This project was bootstrapped with [Create React App (CRA)](https://github.com/facebook/create-react-app). 
This CRA allows developers to view the application in a web browser, make changes to the code, and see those changes reflected immediately without having to manually refresh the page. This feature is known as "hot reloading".

You can learn more in the [Create React App documentation](https://create-react-app.dev/docs/getting-started/).

To learn React, check out the [React documentation](https://react.dev/), and to delve deeper even deeper,skip to this [section](#react-development)

## Setting Up

It is advisable to work on this project using an IDE rather than through the github repository workspace; as this makes it easier to make changes to this project using git commands.

In this guide, VS code would be used as the IDE template to setup and work on this project. However, you can use any IDE of your choice. 

Now to setup your local repository in your IDE you would need to perform these next steps.

## Clone this repository <a name="clone"></a>
This simply means replicating the files in this repostiroty in your IDE.

### Step 1

Navigate to your forked repository, on the left side of your screen click on the drop down with "code" written on it. This will bring out a small dialog box; make no changes to this box but simply copy the url.

![](./Clone.png)


### Step 2

Create a folder on your computer that would house this repository amd oopen this folder in your IDE. Open the terminal in your IDE.

Run the command

`git init`

To clone the remote repository to your desktop repository

`git remote add origin "paste the link you copied from the remote repository"`


Create your feature branch using git checkout -b my-feature

### Step 3

Commit your changes using git commit -m 'feat: My new feature';

### Step 4

Push to the branch using git push origin my-feature;

### Step 5

Create a new [pull request] (SubmitPR.md)
After your Pull Request is merged, can you delete your feature branch.



## Setup In your IDE

next, move down to your system and create a new folder in your desktop/ document folder or any placd of your choice and name this codebooker. open your IDE and navigate to open folders and select the folder you just created and click open.

this imediately opens up a worksace for you. NOw in this IDE navigate to your terminal and type in the `git init` command. this initializes the repository and gets it set for the next course of action.

with your already copied url from github type in `git remote add origin <paste your copied url like this>` and paste . this command immediatley kickstarts the cloning process and replicates all the files from the main reposiry into your local repository. And you have finally setupo your working environment.


## Setup the project

Now to fully integrate the repository in your local application you would need to integrate some environment variables and dependencies to be able to setup this project properly to work with









## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More about React Development <a name="react-development"></a>



### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
