# Insightfinder

## Setup development environment

### Tools
The frontend uses [Webpack] to build the js/css code. Webpack is based on [nodejs], so we need to install nodejs, npm 
and [yarn].

For Mac, we can install nodejs through [brew].

    1. Install brew on Mac
    $ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    
    2. Install nodejs on Mac
    $ brew install nodejs
    
    3. Check the nodejs version >= 6.1
    $ node -v 
    
    4. Install yarn through npm
    $ npm install -g yarn    

For Ubuntu, we need to install [nodejs] and [npm].
    
    1. Install nodejs
    $ sudo apt-get update
    $ sudo apt-get install nodejs

    2. Install npm
    $ sudo apt-get install npm
    
    3. Install yarn through npm
    $ sudo npm install -g yarn
    Note: If cannot install yarn through npm check https://yarnpkg.com/en/docs/install#linux-tab

The frontend uses react & [redux], to help check the redux state, a browser's extension needed to be installed:
https://github.com/zalmoxisus/redux-devtools-extension

### Install project dependencies

The frontend codes use some 3rd party libraries, which is recorded in the package.json file. So to build the frontend code,
we first need to install these libraries, and update the libraries if we update the files.

    1. Go to project root folder
    $ cd ~/dev/insightfinder/web/frontend
    
    1. Install dependencies packages through yarn.
    $ yarn install
    
If we need to install new packages, remember to update the package.json file with yarn add dev with/out --dev.

    1. Update packages if it's changed
    $ yarn install
    
After having installed [nodejs], [yarn] and packages, we can begin to write code.

## Prerequisites
- Install nodejs
- Install frontend packages `cd ./frontend && yarn install`

## Start development
- Go to frontend folder `cd ./frontend`
- Start frontend web server `yarn run web`
- Open browser to [localhost:6060](http://localhost:6060)
- Go to backend folder `cd ./backend`
- Start backend api server `./devServer.sh`

## Frontend dev tasks
- `yarn run web` run app frontend in development mode with HMR enabled.
- `yarn run build:dev` build frontend with development mode, files are
  output to `./static` folder.
- `yarn run test` run frontend test cases.
- `yarn run tw` or `npm run test:watch` run frontend test cases with 
  watch mode.
- `yarn run cov` or `npm run coverage` run code coverage check, reports
  are output to `./coverage` folder
- `yarn run story` run storybook hot server
- `yarn run jest` run jest command

## Localization
- `yarn run msg` Extract code to check mismatch localization messages.
- `yarn run msg:sync` Sync messages in code with the localization strings.
- If need to add new locales, create a new file in messages folder. The file name 
is based on BCP47. And also needs to add locales in src/common/loadLocaleMessages.js,
getBrowserLocale.js.

## Frontend build tasks
- `yarn run build` build frontend code for production
- `yarn run clean` clean build output files

## Folder strucuture
* `__mocks__` jest general mocks for images and style files
* `__tests__` jest integration test cases
* `coverage` jest coverage output folder
* `gulp` gulp tasks for the building system
* `src` source code and unit tests code
* `storybook` storybook config files
* `webpack` webpack config files
* `.babelrc` babel settings for jest, storybook, gulp and webpack
* `.eslintignore` eslint ignored folder
* `.eslintrc` eslint rules
* `.flowconfig` flow type config <= not used
* `.gitignore` git ignore file
* `.watchmanconfig` <= not used
* `gulpfile.bable.js` gulp task entrypoint
* `package.json`
* `webpack.settings.js` webpack settings for application
* `yarn.lock` yarn version lock file

## Issues
- run-sequence is a hack for run gulp task sequence. After upgraded to 
  gulp 4, it should be removed.

## Common Issues
### node-sass failed with Error: ENOENT: no such file or directory, scandir `**/node_modules/node-sass/vendor' https://github.com/sass/node-sass/issues/1579
    # https://github.com/sass/node-sass/issues/1579
    $ npm rebuild node-sass

[Webpack]: https://webpack.github.io/
[nodejs]: https://nodejs.org/
[npm]: https://www.npmjs.com/
[brew]: http://brew.sh/
[yarn]: https://yarnpkg.com/
[redux]: http://redux.js.org/