# Developer Environment Setup

This section contains information that will help you:

- [Clone this project](#clone);
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

Create a folder on your computer open this folder in your IDE. Open the terminal in your IDE and cd into this folder

Run the command

```
git init

```

To clone the remote repository to your desktop repository,

```
git clone "paste the link you copied from the remote repository"

```

for example,
```
git clone https://github.com/Chizobaonorh/codebooker.git

```

## Setup up working environment

Now we have cloned this project, we need to install create our feature branch where our changes would be commited to before merging to the mian brach. we will also need to set up the environment dependencies to make this project effectively.

### Step 1

Create your feature branch using

```
git checkout -b "feature-branch"

```

### Step 2

 Install dependencies by running

 ```
 npm i

 ```

In the project directory run:

```
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

Next,

```
npm test
```

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

Next, 

```
npm run build
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

Finally,

```
npm run eject
```

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.


### Step 3

Commit your changes using git commit -m 'feat: My new feature';

### Step 4

Push to the branch using git push origin my-feature;

### Step 5

Create a new [pull request] (SubmitPR.md)
After your Pull Request is merged, can you delete your feature branch.



## React Development <a name="react-development"></a>

Learn More about React development.

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
