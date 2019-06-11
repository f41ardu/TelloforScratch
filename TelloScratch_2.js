 
 
 (function(ext) {
   // /home/pi/code/TelloforScratch/TelloScratch_2.js
   // Tello udp port and IP address
   var PORT = 8889 ;
   var HOST = '192.168.10.1'; // Tello IP
   //var HOST = '127.0.0.1'; // Test localhost
   
   // Scratch listener port 
   var listenerPort = 8890; 
   var listenerHOST = '0.0.0.0';

   // udp connector  
   var dgram = require('dgram');
   // client connector (send commands) 
   var client = dgram.createSocket('udp4');
   // server connector (receive Telle response) 
   var server = dgram.createSocket('udp4');
   // initial variables
   var myStatus = 1; // initially set status to yellow
   var connected = false; // initially set connected to false
   var getData = ' '; // initial set blank 
   
   // Scratch UDP Listener (experimental) 
   ext.cnct = function() {	

		server.on("error", function (err) {
			console.log("server error:\n" + err.stack);
			server.close();
		});

		server.on("message", function (msg, rinfo) {
			//setReceived("server got: " + msg + " from " + rinfo.address + ":" + rinfo.port); 
			setReceived("_"+ msg +"_"); 
			//myStatus = 1;         
			});

		server.on("listening", function () {
			myStatus = 2; });
	    // listen on all IP adresses
		server.bind(listenerPort);
   };		    
  
   
   // transfer UDP feedback into Scratchblock
   function setReceived(message) {
	   getData = message;
	   //myStatus = 0; 
   };
    // end UDP Listener (experimental)
   
   // Cleanup function when the extension is unloaded

   ext._shutdown = function() {};

   // Status reporting code

   // Use this to report missing hardware, plugin

   // or unsupported browser

   ext._getStatus = function() {
     return {status: myStatus, msg: 'Ready'};
   };
   
   // Send command 'command' and set Tello into SDK mode
   ext.command = function () {
   
   var message = new Buffer('command');

	client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
	//	if (err) throw err;
	//	client.close();
	});
            // change status ligth from yellow to green
            myStatus = 2;
            connected = true; // connected
   };
   
   // Send command and set Tello into SDK mode
   ext.sendcommand = function () {
   
   var message = new Buffer('command');

	client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
		//if (err) throw err;
		//client.close();
		});
   };
   
   // Send takeoff
   ext.takeoff = function () {
   
   var message = new Buffer('takeoff');

	client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
		//if (err) throw err;
		//client.close();
		});
   };
   
   // Send land
   ext.land = function () {
   
   var message = new Buffer('land');

	client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
		//if (err) throw err;
		//client.close();
		});   
   };
   
    // Send set speed
   ext.setspeed = function (val) {
   
   var message = new Buffer('speed ' + val);

	client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
		//if (err) throw err;
		//client.close();
		});   
   };

   // Send set up
   ext.up = function (val) {
   
   var message = new Buffer('up ' + val);

	client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
		//if (err) throw err;
		//client.close();
		});
		return msg;
   };
   
   // Send set down
   ext.down = function (val) {
   
   var message = new Buffer('down ' + val);

	client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
		//if (err) throw err;
		//client.close();
		});
   };
   
   // Send set left
   ext.left = function (val) {
   
   var message = new Buffer('left ' + val);

	client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
		//if (err) throw err;
		//client.close();
		});
   
   };
   
   // Send set right
   ext.right = function (val) {
   
   var message = new Buffer('right ' + val);

	client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
		//if (err) throw err;
		//client.close();
		});
   
   };
   
   // Send set forward
   ext.forward = function (val) {
   
   var message = new Buffer('forward ' + val);

	client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
		//if (err) throw err;
		//client.close();
		});
	};
	
   // Send set back
   ext.back = function (val) {
   
   var message = new Buffer('back ' + val);

	client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
		//if (err) throw err;
		//client.close();
		});
   };
   
   // Send set cw
   ext.cw = function (val) {
   
   var message = new Buffer('cw ' + val);

	client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
		//if (err) throw err;
		//client.close();
		});
   };

   // Send set ccw
   ext.ccw = function (val) {
   
   var message = new Buffer('ccw ' + val);

	client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
		//if (err) throw err;
		//client.close();
		});
   };

// Get result
   ext.result = function () {
   var test = getData;
   return test;
   };

   // Send set flip Direction
   ext.setflipDirection = function (val) {
   
   var message = new Buffer(val);

	client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
		//if (err) throw err;
		//client.close();
		});
   
   };
   

   // added function to support the Start The Program block
   ext.goGreen = function() {
     myStatus = 2;
     console.log(myStatus);
   };

   // Block and block menu descriptions
   var descriptor = {
    blocks: [
     // ['h', 'Command', 'command'], 		// send command string
		[' ', 'Receiver', 'cnct'],
		['r', 'Result %s', 'result'],
		[' ', 'Send command', 'sendcommand'],
		[' ', 'take off', 'takeoff'],
		[' ', 'land', 'land'],
		[' ', 'fly up with distance %n', 'up', 20],
		[' ', 'fly down with distance %n', 'down', 20],
		[' ', 'fly left with distance %n', 'left', 20],
		[' ', 'fly right with distance %n', 'right', 20],
		[' ', 'fly forward with distance %n', 'forward', 20],
		[' ', 'fly back with distance %n', 'back', 20],
		[' ', 'rotate CW with angle %n', 'cw', 90],
		[' ', 'rotate CCW with angle %n', 'ccw', 90],
		[' ', 'flip direction %m.flipDirection', 'setflipDirection', 'forward'],
		[' ', 'set speed %n', 'setspeed', 80]	
 	  ],
 	  menus: {
        flipDirection: ['left', 'right', 'forward', 'back']
    },
    url: 'https://github.com/f41ardu',
    displayName: 'Tello SDK'
};

   // Register the extension
   ScratchExtensions.register('Tello SDK', descriptor, ext);
 })({});
