# Contributing to CodeBooker development

We welcome Pull Requests (PR's) as well as having people working on fixing it's current issues. If you are coming to this project new.
If you notice an issue with this app, please feel free to open an issue.

A lot of developers prefer asking if they could contribute or be assigned a task as a reply to a reported issue in the Issues tab.  This is great.
Typically, if you think it will take you longer than 72 hours after having been assigned to the issue you will work on to submit a PR, please
let us know that way issues do not go stale.

Some tasks may not be beginner friendly even if tagged `good first issue`.. so try and judge the task accordingly.
If you are a beginner, there are smaller tasks a beginner can work on such as style issues.

You should already be familiar with React 17 and or 18, JavaScript ES5/ES6/ES7.

## Style

I have not created an official style guide yet. If anyone would like to create a style guide for us. Create a Discussion.

## Development

If you are not sure what to work on, review the issues list.  There are also TODO's that will listed in the included TODO.md file.

### PR's

  When you do a PR on GitHub, Please make sure you complete the section on the right.
  Assignees, Reviewers, Labels, Projects, Milestone(s) and Development before you submit the PR.
  Please also share a screenshot or show the working fix in the Pull Request message and a brief description of what you fixed.
  Please keep in mind that Blank issues and especially PR's without a description of the changes you made may not get merged.

- Link an issue to Development that the PR will close
- Make sure that you tag a reviewer i.e. @gbowne1
- Pick appropriate labels from Labels
- Make sure you are the assignee to the PR.
- Milestone, choose Frontend or Backend (more may come later on)

## Versioning

We generally follow SemVer for this application.  We also have a CHANGELOG.md provided to us by keepachangelog.com
Please use the changelog document accordingly.

### Issues

@gbowne1 and other project maintainers will assign users to issues on a first come, first serve basis.
If you would like to work on an issue, please let us know.

## Editor & IDE

The repository contains folders with project appropriate settings and configurations for Visual Studio and Visual Studio code but beyond that, We are tool and editor/IDE agnostic so you can use whatever editor or IDE or you like.

## Settings & Configuration

The included workspaces, settings, configurations and plugins are for:

Babel
Webpack
ESLint
Prettier
VSCode (.vscode)
GitHub (.github)

These may not be 100% correct, so if you can contribute to them to make them more accurate for React development it is welcomed.

We understand it is not a good idea to contribute the configuration to the project, however this will greatly improve the new user experience getting
started working with our code base.

## Tech Stack

 This project was bootstrapped with Create React App.
 This application is built with:

- React 18.2
- JavaScript (ES5/ES6/ES7/ES2015/etc.)
- NodeJS
- ExpressJS
- Material UI v5.11.6
- Jest and React's testing-library for all testing
- Prisma and/or MongoDB/Mongoose

All core components are built with JSX.

## Branches

Our branches follow GitFlow / GitHub Flow as a general rule.

- [ main ] main working branch
- [ master ] Permanent // Archive branch
- [ test ] untested code
- Feature Branch # of feature - {feature}
- [bugfix - { fixed bug }]
- [hotfix - { fix }]

Use a test branch to commit/push code that you believe should work but is not completely tested.
