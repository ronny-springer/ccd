var fs = require('fs'),
    path = require('path');

function FileReader() {}

FileReader.prototype.readFile = function ( file, callback ) {
	var filePath = path.join(__dirname, file || ''),
		fileEncoding = 'utf-8',
		noop = function () {};

	fs.readFile(filePath, {encoding: fileEncoding}, callback || noop);
};

exports = module.exports = new FileReader();
