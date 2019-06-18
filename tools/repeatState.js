var dgram = require("dgram");

var server = dgram.createSocket("udp4");
var client = dgram.createSocket("udp4");
var initial = new Buffer('pitch:34;roll:-127;yaw:69;vgx:0;vgy:0;vgz:0;templ:81;temph:83;tof:145;h:0;bat:10;baro:1.06;time:2;agx:727.00;agy:434.00;agz:447.00;');

server.on("error", function (err) {
	  console.log("server error:\n" + err.stack);
	  server.close();
});

server.on("message", function (msg, rinfo) {
	  console.log("server got: " + msg + " from " +
		      rinfo.address + ":" + rinfo.port);
	        var message = new Buffer( initial );
		client.send(message, 0, message.length, 8890, '127.0.0.1', function(err, bytes) {
		if (err) throw err;
		console.log('UDP message ' + message +' sent to ' + '127.0.0.1' +':'+ '8890');
		});
});

server.on("listening", function () {
	  var address = server.address();
	  console.log("server listening " +
		        address.address + ":" + address.port);
});

server.bind(8889);
// server listening 0.0.0.0:41234
