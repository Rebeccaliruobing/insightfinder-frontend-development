# Insightfinder

## Setup development environment

### Tools
The frontend uses [Webpack] to build the js/css code. Webpack is based on [nodejs], so we need to install nodejs first.

For Mac, we can install nodejs through [brew].

    1. Install brew on Mac
    $ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    
    2. Install nodejs on Mac
    $ brew install nodejs
    
    3. Check the nodejs version >= 6.1
    $ node -v 
    
    
For Ubuntu, we need to install [nodejs] and [npm].
    
    1. Install nodejs
    $ sudo apt-get update
    $ sudo apt-get install nodejs

    2. Install npm
    $ sudo apt-get install npm

### Install project dependencies

The frontend codes use some 3rd party libraries, which is recorded in the package.json file. So to build the fronted code,
we first need to install these libraries, and update the libraries if we update the files.

    1. Go to project root folder
    $ cd ~/dev/insightfinder/web
    
    2. Install dependencies packages through npm. Npm will read the package.json to get the package list.
    $ npm install
    
If we need to install new packages, remember to update the package.json file with npm option --save-dev or --save.

    3. Update packages if it's changed
    $ npm update
    
After having installed [nodejs] and packages, we can begin to write code.

## Local development

When we develop code locally, we need to startup a web server of host the frontend js/css code. 
Currently, the web server for local development is based on python [Flask]. To we need to setup python environment:

    1. On Mac, install last python 2.x and pip through brew, check pip is installed. version > 7.x
    $ brew install python
    $ pip --version
    
    2. On Ubuntu, install python & pip
    $ sudo apt-get install python-pip python-dev build-essential
    
After having installed pip, we need to install the python packages through pip.

    1. Go to project root folder
    $ cd ~/dev/insightfinder/web
    
    2. Install python packages
    $ pip =r requirements/local.txt

For local development, we use [webpack dev-server](http://webpack.github.io/docs/webpack-dev-server.html)
to build frontend code. Webpack dev-server will monitor the code files, and rebuild the codes automatically. To startup
the local environment, we need to startup webpack dev-server and Flask web server:

    1. Start webpack dev-server
    $ npm run dev
    
    2. Start Flask web server
    $ npm run devserver

## Stage and Production build

When we decide to publish the frontend code, we need to build the frontend for publishing. The stage mode will build the
code with debugging settings, which makes it easy to debug the js code. The production mode build the code with optimize
settings, which is fast but hard to debug.

    1 Build code for stage
    $ npm run stage
    
    2. Build code for production
    $ npm run build 
    
    

### Code Structures

	+ Template engine: [ejs](http://www.embeddedjs.com/)
	+ Template directory: frontend/templates
	+ Generated code directory: static/html

	> Examples: 

		* Webpack config: webpack.base.config.js

		```
				new HtmlWebpackPlugin({
		            filename: 'html/index.html',
		            template: './templates/index.ejs',
		            inject: false,
		            alwaysWriteToDisk: true,
		        })
		```

		* Template: frontend/templates/index.ejs

	    ```
	    	<!doctype html>
			<html lang="en">
			<head>
			  <meta charset="utf-8">
			  <title><%= htmlWebpackPlugin.options.title %></title>
			  <meta name="viewport" content="width=device-width, initial-scale=1">
			  <% for (var css in htmlWebpackPlugin.files.chunks.index.css) { %>
			  	<link href="<%= htmlWebpackPlugin.options.baseURL %><%= htmlWebpackPlugin.files.chunks.index.css[css] %>" rel="stylesheet">
			  <% } %>
			</head>
			<body>
			<script src="<%= htmlWebpackPlugin.options.baseURL %><%= htmlWebpackPlugin.files.chunks.index.entry %>"></script>
			</body>
			</html>
		```

		* Generated code: /static/html/index.html

		```
			<!doctype html>
			<html lang="en">
			<head>
			  <meta charset="utf-8">
			  <title>Webpack App</title>
			  <meta name="viewport" content="width=device-width, initial-scale=1">
			  
			  	<link href="http://localhost:3000/static/index.d41d8.css" rel="stylesheet">
			  
			</head>
			<body>
			<script src="http://localhost:3000/static/index.2cb59.js"></script>
			</body>
			</html>
		```	

		* Backend rendering: views.py:

		```
			render_remplate('index.html')

		```
		
[Webpack]: https://webpack.github.io/
[nodejs]: https://nodejs.org/
[npm]: https://www.npmjs.com/
[brew]: http://brew.sh/
[Flask]: http://flask.pocoo.org/
