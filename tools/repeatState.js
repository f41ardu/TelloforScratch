var dgram = require("dgram");

var server = dgram.createSocket("udp4");
var client = dgram.createSocket("udp4");
var initial = new Buffer('pitch:34;roll:-127;yaw:69;vgx:0;vgy:0;vgz:0;templ:81;temph:83;tof:145;h:0;bat:10;baro:1.06;time:2;agx:727.00;agy:434.00;agz:447.00;');

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

server.on("error", function (err) {
	  console.log("server error:\n" + err.stack);
	  server.close();
});

server.on("message", function (msg, rinfo) {
	  console.log("server got: " + msg + " from " +
		      rinfo.address + ":" + rinfo.port);
	        // var message = new Buffer( 'pitch:'+getRandomInt(-180, 180)+';roll:'+getRandomInt(-180, 180)+';yaw:'+getRandomInt(-180, 180)+';vgx:'+getRandomInt(20, 150)+';vgy:'+getRandomInt(20, 150)+';vgz:'+getRandomInt(20, 150)+';templ:'+getRandomInt(50, 100)+';temph:'+getRandomInt(50,100)+';tof:145;h:'+getRandomInt(20, 3000)+';bat:'+getRandomInt(10, 100)+';baro:1.06;time:'+getRandomInt(-500,-400)+';agx:727.00;agy:434.00;agz:447.00;' );
		    var message = new Buffer ('pitch:'+getRandomInt(-180, 180)+';roll:-15;yaw:-50;vgx:0;vgy:0;vgz:0;templ:93;temph:96;tof:10;h:0;bat:92;baro:421.51;time:0;agx:717.00;agy:66.00;agz:-673.00;');

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
