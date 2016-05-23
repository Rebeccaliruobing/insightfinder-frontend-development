# Insightfinder webapp


### 变更事项

1. 后端模板由前端webpack生成, server端不再写html

	+ 模板引擎: [ejs](http://www.embeddedjs.com/)
	+ 模板目录: frontend/templates
	+ 生成目录: static/html
	+ 生成开发模式目录: static/html

	> 示例: 

		* webpack配置: webpack.base.config.js

		```
				new HtmlWebpackPlugin({
		            filename: 'html/index.html',
		            template: './templates/index.ejs',
		            inject: false,
		            alwaysWriteToDisk: true,
		        })
		```

		* 模板: frontend/templates/index.ejs

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

		* 生成文件(*自动生成): /static/html/index.html

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

		* 后端渲染: views.py:

		```
			render_remplate('index.html')

		```