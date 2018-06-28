var fs = require('fs');
var printer = require("printer");
var path = __dirname + '/';
var filename = "";
var	util = require('util');

console.log("Printer Driver Start")
sendPrinter = function(filename, print) {
	//filename = __dirname + "/" + filename;
	console.log("Filename = " + filename)
	console.log("Drucker = " + print)
	
	var file = path + filename;
	var data
/*
	fs.readFile(file, (err, data) => {
	  if (err) throw err;
	  console.log(data);
	  
	  
	  
	});
*/
	
/*
	 printer.printFile({filename: filename,
		success:function(jobID){
	      	console.log("sent to printer with ID: "+jobID);
	  	}
		 
	 });
*/

printer.printDirect({data:filename // or simple String: "some text"
	, printer:'EPSON Hamburg' // printer name, if missing then will print to default printer
	, type: 'POSTSCRIPT' // type: RAW, TEXT, PDF, JPEG, .. depends on platform
	, success:function(jobID){
		console.log("sent to printer with ID: "+jobID);
	}
	, error:function(err){console.log(err);}
});
/*

	if( process.platform != 'win32') {
	  printer.printFile({filename: filename,
	  success:function(jobID){
	      console.log("sent to printer with ID: "+jobID);
	  },
	    error:function(err){
	      console.log(err);
	    }
	  });
	} else {
	  // not yet implemented, use printDirect and text
	  var fs = require('fs');
	  printer.printDirect({data:fs.readFileSync(filename),
	    printer: print, // printer name, if missing then will print to default printer
	    success:function(jobID){
	      console.log("sent to printer with ID: "+jobID);
	    },
	    error:function(err){
	      console.log(err);
	    }
	  });
	}
*/
	
}

read = function() {
	console.log("supported job commands:\n"+util.inspect(printer.getSupportedJobCommands(), {colors:true, depth:10}));
	console.log("supported formats are:\n"+util.inspect(printer.getSupportedPrintFormats(), {colors:true, depth:10}));
	//console.log("installed printers:\n"+util.inspect(printer.getPrinters(), {colors:true, depth:10}));
}

module.exports.read = read;
module.exports.sendPrinter = sendPrinter;