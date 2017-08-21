var program = require('commander')
	fr = require('./script/FileReader');

program
  	.version('1.0.0');

program
	.option('-f, --file', 'read css file')
	.action(function(cmd, options) {
    	fr.readFile('%s', function (error, data) {
    		if (!error) {
    			console.log(data);
    		} else {
    			console.log(error);
    		}
    	});
  	});

program
	.parse(process.argv);
