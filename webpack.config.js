let path = require('path')

module.exports = {
	mode: "development",
	entry: '/src/main.js',
	output: {
		path: path.resolve('./dist'),
		filename:'bundle.js'
	},
	watch:true,
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 9000,
		https: true,
	},
}