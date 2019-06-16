var dgram = require("dgram");

var server = dgram.createSocket("udp4");
var client = dgram.createSocket("udp4");
var initial = new Buffer('OK');

// ['OK','speed?','battery?','time?','height?','temp?','attitude?','baro?','acceleration?','tof?']

 var dict = {
  'speed?' : 8890, 
  'battery?' : 8890, 
  'time?' : 8890, 
  'height?' : 8890, 
  'temp?' : 8890,
  'attitude?' : 8890,
  'baro?' : 8890,
  'acceleration?' : 8890,
  'tof?' : 8890, 
  'command' : 9000, 
};

/*
var dict = {};

dict['speed?'] = 8890;

dict['command'] = 9000;
*/
console.log(dict);

console.log("Dict: ", dict["speed?"]);

server.on("error", function (err) {
	  console.log("server error:\n" + err.stack);
	  server.close();
});

server.on("message", function (msg, rinfo) {
	  console.log("server got: " + msg + " from " +
		      rinfo.address + ":" + rinfo.port);
		    console.log("msg: ", ""+msg+""); 
	        var port = dict[msg];
	        console.log("Dict: ", port);
	        var message = new Buffer( initial + " " + msg );
	    if (port == "9000" || port == "8890") {
		client.send(message, 0, message.length, port, '127.0.0.1', function(err, bytes) {
		if (err) throw err;
		console.log('UDP message ' + message +' sent to ' + '127.0.0.1' +':'+ port);
		});}
});

server.on("listening", function () {
	  var address = server.address();
	  console.log("server listening " +
		        address.address + ":" + address.port);
});

server.bind(8889);
// server listening 0.0.0.0:41234
