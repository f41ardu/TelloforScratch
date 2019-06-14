 /* 
  * 
  * MIT License
  * 
  * Copyright (c) 2019 f41_ardu
  * 
  * Permission is hereby granted, free of charge, to any person obtaining a copy
  * of this software and associated documentation files (the "Software"), to deal
  * in the Software without restriction, including without limitation the rights
  * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  * copies of the Software, and to permit persons to whom the Software is
  * furnished to do so, subject to the following conditions:
  * 
  * The above copyright notice and this permission notice shall be included in all
  * copies or substantial portions of the Software.
  * 
  * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  * SOFTWARE.
  * 
  */
 
 (function(ext) {
   // /home/pi/code/TelloforScratch/TelloScratch_2.js
   // Tello udp port and IP address
   var PORT = 8889 ;
   //var HOST = '192.168.10.1'; // Tello IP
   var HOST = '127.0.0.1'; // Test localhost (debug mode)
   
   // Scratch listener port 
   var listenerPort = 9000;  
   var listenerHOST = '0.0.0.0';

   // udp connector  
   var dgram = require('dgram');
   // client connector (send commands) 
   var client = dgram.createSocket('udp4');
   // server connector (receive Telle response) 
   var server1 = dgram.createSocket('udp4');
   
   // initial variables
   var myStatus = 1; // initially set status to yellow
   var connected = false; // initially set connected to false
   var getData = ' '; // initial set blank 
   var getOK = ' '; // initial set blank

   // Scratch UDP Listener (experimental) 
   ext.cnct = function() {	

		server1.on("error", function (err) {
			console.log("server error:\n" + err.stack);
			server.close();
		});

		server1.on("message", function (msg, rinfo) {
			//setReceived("server got: " + msg + " from " + rinfo.address + ":" + rinfo.port); 
			getData = ' '+msg+' '; 
			//myStatus = 1;         
			});

		server1.on("listening", function () {
			myStatus = 2; });
	    // listen on all IP adresses
		server1.bind(listenerPort);
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
 
   // Send set fly direction and distance to fly
   ext.flydir = function (direction, distance) {
   
   var message = new Buffer(direction + ' ' + distance);

	client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
		//if (err) throw err;
		//client.close();
		});
   };
   
   // Send rotation direction and rotation angle
   ext.rotation = function (direction, angle) {
   
   var message = new Buffer(direction + ' ' + angle);

	client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
		//if (err) throw err;
		//client.close();
		});
   };

   // Send set flip Direction
   ext.setflipDirection = function (val) {
   
   var message = new Buffer('flip ' + val.charAt(0));

	client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
		//if (err) throw err;
		//client.close();
		});
   
   };
   
   // read Data improved for all Tello return codes, flight and state commands
   ext.readData = function (val) {
      
      var message = new Buffer(val);
      if (val == 'OK' ) {
	    // for all flight commands 
	    // we need a wait statement here
	    var test = getData.trim();
      } else {
	     client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
			});
	    // for all state commands
	    // we need a wait statement here 		
	    var test = getData.trim();
      }
      
      getData = ""; // clear getDate
      return test;

   };

// Get result (to be removed from code later) 
   ext.Data = function () {
   var test = getData.trim();
   getData = ""; 
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
		['r', 'Data', 'Data'],
		[' ', 'Send command', 'sendcommand'],
		['r', 'Read %m.readcommand', 'readData', 'OK'],
		[' ', 'take off', 'takeoff'],
		[' ', 'land', 'land'],
		[' ', 'fly %m.direction with distance %n', 'flydir', 'up', '20'],
		[' ', 'rotate %m.rotation with angle %n', 'rotation', 'cw', '90'],
		[' ', 'flip direction %m.flipDirection', 'setflipDirection', 'forward'],
		[' ', 'set speed %n', 'setspeed', 80]	
 	  ],
 	  'menus': {
        'flipDirection': ['left', 'right', 'forward', 'backward'],
        'direction'    : ['up', 'down', 'forward', 'backward', 'left', 'right'],
        'rotation'     : ['cw', 'ccw'],
        'readcommand'  : ['OK','speed?','battery?','time?','height?','temp?','attitude?','baro?','acceleration?','tof?']
    },
    url: 'https://github.com/f41ardu',
    displayName: 'Tello SDK'
};

   // Register the extension
   ScratchExtensions.register('Tello SDK', descriptor, ext);
 })({});
