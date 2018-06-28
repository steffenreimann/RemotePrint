// use: node printFile.js [filePath printerName]

var express        	= require('express');
var app            	= express();
var httpServer		= require("http").createServer(app);
var io              = require('socket.io')(httpServer);
var printer = require("printer"),
    filename = "ticket.txt",//process.argv[2] || __filename,
	util = require('util');
	
var fs = require('fs');
var Printer = require('ipp-printer');

var printerr = new Printer('My Node Printer')

printerr.on('job', function (job) {
  console.log('[job %d] Printing document: %s', job.id, job.name)

  var filename = 'job-' + job.id + '.ps' // .ps = PostScript
  var file = fs.createWriteStream(filename)

  job.on('end', function () {
    console.log('[job %d] Document saved as %s', job.id, filename)
  })

  job.pipe(file)
})


conf = {
    "port": 8081
}

console.log('platform:', process.platform);
console.log('try to print file: ' + filename);
console.log("supported job commands:\n"+util.inspect(printer.getSupportedJobCommands(), {colors:true, depth:10}));


printers = printer.getPrinters();

printers.forEach(function(iPrinter, i){
    console.log('' + i + 'ppd for printer "' + iPrinter.name + '":' + util.inspect(printer.getPrinterDriverOptions(iPrinter.name), {colors:true, depth:10} ));
    console.log('\tselected page size:'+ printer.getSelectedPaperSize(iPrinter.name) + '\n');
});




httpServer.listen(conf.port);

app.use(express.static(__dirname + '/'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});


app.get('/test', function(req, res) {
    res.send("Hallo");
    const state = db.getState()
    const str = JSON.stringify(state, null, 2)
    console.log(db);
    console.log(str);
});


app.get('/print', function (req, res) {
  res.send('Hello World!');
});



console.log('Server Läuft unter http://localhost:' + conf.port);






io.on('connection', function (socket) {
  socket.emit('news', { hello: 'noob' });
    
  socket.on('print', function (data) {
     
      console.log(data);
      if( process.platform != 'win32') {
	  printer.printFile({filename:filename,
	  printer: process.env[3], // printer name, if missing then will print to default printer
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
	    printer: process.env[3], // printer name, if missing then will print to default printer
	    success:function(jobID){
	      console.log("sent to printer with ID: "+jobID);
	    },
	    error:function(err){
	      console.log(err);
	    }
	  });
	}

      
  });
});