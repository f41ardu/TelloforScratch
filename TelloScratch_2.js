 
 
 (function(ext) {
   // /home/pi/code/TelloforScratch/TelloScratch_2.js
   // Tello udp port and IP address
   var PORT = 8889 ;
   //var HOST = '192.168.10.1'; // Tello IP
   var HOST = '127.0.0.1'; // Test localhost (debug mode)
   
   // Scratch listener port 
   var listenerPort = 8890; 
   var listenerPortOK = 9000; 
   var listenerHOST = '0.0.0.0';

   // udp connector  
   var dgram = require('dgram');
   // client connector (send commands) 
   var client = dgram.createSocket('udp4');
   // server connector (receive Telle response) 
   var serverOK = dgram.createSocket('udp4');
   // server connector (receive Telle response) 
   var serverOK = dgram.createSocket('udp4');

   // initial variables
   var myStatus = 1; // initially set status to yellow
   var connected = false; // initially set connected to false
   var getData = ' '; // initial set blank 
   var getOK = ' '; // initial set blank

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
   
   // Scratch UDPOK Listener (experimental) 
   ext.cnctOK = function() {	

		serverOK.on("error", function (err) {
			console.log("server error:\n" + err.stack);
			serverOK.close();
		});

		serverOK.on("message", function (okmsg, rinfo) {
			//setReceived("server got: " + msg + " from " + rinfo.address + ":" + rinfo.port); 
			setOKReceived("_"+ okmsg +"_"); 
			//myStatus = 1;         
			});

		serverOK.on("listening", function () {
			myStatus = 2; });
	    // listen on all IP adresses
		serverOK.bind(listenerPortOK);
   };		    
  
   
   // transfer UDPOK feedback into Scratchblock
   function setOKReceived(message) {
	   getOK = message; 
   };
    // end UDP Listener2 (experimental)

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
 
   // Send set fly direction and distance
   ext.flydir = function (direction, distance) {
   
   var message = new Buffer(direction +' ' + distance);

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


   // Send set flip Direction
   ext.setflipDirection = function (val) {
   
   var message = new Buffer(val);

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
   
   // Get result
   ext.resultOK = function () {
   var test = getOK;
   return test;
   };   

   // added function to support the Start The Program block
   ext.goGreen = function() {
     myStatus = 2;
     console.log(myStatus);
   };

   // Block and block menu descriptions
   var descriptor = {
    blocks: [
		[' ', 'Receiver', 'cnct'],
		[' ', 'Response', 'cnctok'],
		['r', 'Result', 'result'],
		['r', 'ResultOK', 'resultOK'],
		[' ', 'Send command', 'sendcommand'],
		[' ', 'take off', 'takeoff'],
		[' ', 'land', 'land'],
		[' ', 'fly %m.direction with distance %n', 'flydir', 'up', '20'],
		[' ', 'rotate CW with angle %n', 'cw', 90],
		[' ', 'rotate CCW with angle %n', 'ccw', 90],
		[' ', 'flip direction %m.flipDirection', 'setflipDirection', 'forward'],
		[' ', 'set speed %n', 'setspeed', 80]	
 	  ],
 	  'menus': {
        'flipDirection': ['left', 'right', 'forward', 'backward'],
        'direction' : ['up', 'down', 'forward', 'backward', 'left', 'right']
    },
    url: 'https://github.com/f41ardu',
    displayName: 'Tello SDK'
};

   // Register the extension
   ScratchExtensions.register('Tello SDK', descriptor, ext);
 })({});
