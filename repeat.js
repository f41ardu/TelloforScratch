var dgram = require("dgram");

var server = dgram.createSocket("udp4");
var client = dgram.createSocket("udp4");
var message = new Buffer('OK');


server.on("error", function (err) {
	  console.log("server error:\n" + err.stack);
	  server.close();
});

server.on("message", function (msg, rinfo) {
	  console.log("server got: " + msg + " from " +
		      rinfo.address + ":" + rinfo.port);
		client.send(message, 0, message.length, 9000, '127.0.0.1', function(err, bytes) {
		if (err) throw err;
		console.log('UDP message ' + message +' sent to ' + '127.0.0.1' +':'+ '9000');
		});
});

server.on("listening", function () {
	  var address = server.address();
	  console.log("server listening " +
		        address.address + ":" + address.port);
});

server.bind(8889);
// server listening 0.0.0.0:41234
