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
    $ npm install -g yarn
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

## Local development

For local development, we use [webpack dev-server](http://webpack.github.io/docs/webpack-dev-server.html) and express.
To start the development server, run:

    $ yarn run dev

## Production build

When we decide to publish the frontend code, we need to build the frontend for publishing. The output folder is 
web/static, we need to copy the files to server.

    1. Build code for production
    $ yarn run build 

## Code Structures

		
[Webpack]: https://webpack.github.io/
[nodejs]: https://nodejs.org/
[npm]: https://www.npmjs.com/
[brew]: http://brew.sh/
[yarn]: https://yarnpkg.com/
[redux]: http://redux.js.org/