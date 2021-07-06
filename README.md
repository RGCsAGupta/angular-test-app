![CI](https://github.com/CExAGupta/angular-test-app/workflows/CI/badge.svg)

# TestAngularApp
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.3.

- one view/state
- on the main view there are two buttons
- when clicked shows tooltip above the button with some text in it.
  - When button A is clicked, if button B’s tooltip is open it should close and vice versa - only one tooltip should be visible at a time. 
  - Either tooltip closes when clicked anywhere outside of it, but remain open if clicked inside
  - Either tooltip closes when ESC key is pressed.
  - If you scroll down to an open tooltip it detects being at the edge of the screen and change position to be below the button
- At least one accessibility feature
  - Added aria properties
  - Color contrast
- Responsive design
  - layout changes when the app resizes
## Implementation
-  Tooltip functionality is written as a reusable directive.
-  Style using SCSS BEM


## Live demo
Visit [live serve](https://cexagupta.github.io/angular-test-app/)to see a demo

## Travis builds [![Build Status](https://travis-ci.com/CExAGupta/angular-test-app.svg?branch=master)](https://travis-ci.com/CExAGupta/angular-test-app)
## Test Coverage
visit the [live serve](https://cexagupta.github.io/angular-test-app-test-coverage/) for test coverage
## Test results
![test result](/test&#32;result.png)
## Accessibility test results
![accessibility](/accessibility.png)
## Installation
### Cloning the repository
```bash
$ git clone git@github.com:CExAGupta/angular-test-app.git
```
## Installing node_modules
```bash
$ cd angular-test-app
$ npm install -g @angular/cli
$ npm install
```

## Development server
### Run a dev server
```bash
$ npm start
```
Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.



## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
