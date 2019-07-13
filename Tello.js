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
   // /home/pi/code/TelloforScratch/Tello.js
   // Tello udp port and IP address
   var PORT = 8889 ;
   var HOST = '192.168.10.1'; // Tello IP
   //var HOST = '127.0.0.1'; // Test localhost (debug mode)
   
   // Scratch listener port 
   var listenerPort = 8890;  
   var listenerHOST = '0.0.0.0';
   // udp connector  
   var dgram = require('dgram');
   // client connector (send commands) 
   var client = dgram.createSocket('udp4');
   // server connector (receive Tello response) 
   var server1 = dgram.createSocket('udp4');
   
   
   // initial variables
   var myStatus = 1; // initially set status to yellow
   var connected = false; // initially set connected to false
   var getData = ' '; // initial set blank 
   var getStatus = ' '; // initial set blank
   // simple dictionary 
   var dict = {
	'pitch?' : 0, 
	'roll?'  : 1, 
	'yaw?'   : 2, 
	'speed?' : 3, // 4, and 5 vector length
	'temp?' : 6, // and 7 average
	'tof?' : 8, // time of flight
	'height?' : 9, // height
	'battery?' : 10, // % percentage
	'baro?' : 11, // baramoter measurement cm
	'time?' : 12, // Motors on time
	'acceleration?' : 13, // 14, 15 vector length
   }; 
   
   
   
   // Scratch UDP Listener (experimental) 
   ext.cnct = function() {	
   if (connected == false) {
		server1.on("error", function (err) {
			alert("server error:\n" + err.stack);
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
		server1.bind(listenerPort,listenerHOST);
		connected = true; 	
		
		client.bind(PORT);
		
		client.on('message', function (msg, remote) {
	       getStatus = ' '+msg+' ';  
		});
		
	} else {
		alert ("Scratch already listening on udp ports"); 
	}
   };		    
  
   // end UDP Listener (experimental)
   
   // Cleanup function when the extension is unloaded

   ext._shutdown = function() {
	   server1.close();
	   client.close(); 
   };

   // Status reporting code

   // Use this to report missing hardware, plugin

   // or unsupported browser

   ext._getStatus = function() {
     return {status: myStatus, msg: 'Ready'};
   };
   
   // Functions for block with type 'w' will get a callback function as the 
   // final argument. This should be called to indicate that the block can
   // stop waiting.
   // Send command and set Tello into SDK mode
   ext.sendcommand = function () {
   
   var message = new Buffer('command');
    
     if (connected == false) {
            alert("Tello not Connected! \n \n Establish WIFI connection first.");
		}
	client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
		if (err) { 
			alert("Command could not send: " + err);
			client.close();
			}
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
   
     // Send set fly direction and distance to fly
   ext.go = function (x,y,z,speed) {
   
   var message = new Buffer('go' + ' ' + x + ' ' + y + ' ' + z + ' ' + speed);

	client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
		//if (err) throw err;
		//client.close();
		});
   };
   
       // Send set fly direction and distance to fly
   ext.curve = function (x1,y1,z1,x1,y2,z2,speed) {
   
   var message = new Buffer('curve' + ' ' + x1 + ' ' + y1 + ' ' + z1 + ' ' + x2 + ' ' + y2 + ' ' + z2 + ' ' + speed);

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
   
   // read Data and return as string (used for test)
   ext.readData = function (val) {
     
     var message = new Buffer(val); 		
	 var test = getData.trim();
     if ( test != '' ) {
        treturn = test; 
		} else {
			treturn = 'empty';
		}; 
	 	 
     return treturn;
   };

 // read Data and return as string (used for test)
   ext.getStatus = function () {
     		
	 var test = getStatus.trim();
     if ( test != '' ) {
        treturn = test; 
		} else {
			treturn = 'empty';
		}; 
	 	 
     return treturn;
   };
     
   // read Data improved for all Tello return codes, flight and state commands
   ext.readValues = function (val) {
     
	 var test = getData.trim();
	 
     if ( test != '' ) {
        treturn = test;
        var array = test.split(';').map(function (a) { return a.split(':'); });
	    } else {
			return null;
		};  
		
	 var select = dict[val]; 
	 // return pitch
	 if ( select == 0 ) {  
	 var x = array[select][1];
		return x;  
	 };
	 // return roll
	 if ( select == 1 ) {  
		 var x = array[select][1];
		 return x;  
	 };
	 // return yaw
	 if ( select == 2 ) {  
		 var x = array[select][1];
	     return x;  
	 };
	 // return speed
	 if ( select == 3 ) {  
		 var x = array[select][1];
		 var y = array[select+1][1];
		 var z = array[select+2][1]; 
	     return parseFloat(Math.round(Math.sqrt(x*x+y*y+z*z) * 100) / 100).toFixed(2); 
    // parseFloat(Math.round(Math.sqrt(x*x+y*y+z*z) * 100) / 100).toFixed(2);
	 };
	 if ( select == 6 ) {
		 var x = parseFloat(array[select][1]);
		 var y = parseFloat(array[select+1][1]);
		 var z = (x+y)/2.;
		 return  z;
	 };
	 // tof 
	 if ( select == 8 ) {
		 var x = parseFloat(array[select][1]);
		 return  x;
	 };
	 // height 
	 if ( select == 9 ) {
		 var x = parseFloat(array[select][1]);
		 return  x;
	 };
	  // battery 
	 if ( select == 10 ) {
		 var x = parseFloat(array[select][1]);
		 return  x;
	 };
	  // barometer 
	 if ( select == 11 ) {
		 var x = parseFloat(array[select][1]);
		 return  x;
	 };
	  // motor time 
	 if ( select == 12 ) {
		 var x = array[select][1];
		 return  x;
	 };
	 // return acceleration
	 if ( select == 13 ) {  
		 var x = array[select][1];
		 var y = array[select+1][1];
		 var z = array[select+2][1]; 
	     return parseFloat(Math.round(Math.sqrt(x*x+y*y+z*z) * 100) / 100).toFixed(2); 
    // parseFloat(Math.round(Math.sqrt(x*x+y*y+z*z) * 100) / 100).toFixed(2);
	 };
	 return null;
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
		[' ', 'Send command', 'sendcommand'],
		['r', 'Read %m.readcommand', 'readData', 'speed?'],
		['r', 'Values %m.readcommand', 'readValues', 'speed?'],
		['r', 'Status', 'getStatus'],
		[' ', 'take off', 'takeoff'],
		[' ', 'land', 'land'],
		[' ', 'emergency', 'emergency'],
		[' ', 'fly %m.direction with distance %n cm', 'flydir', 'up', '20'],
		[' ', 'rotate %m.rotation with angle %n (°)', 'rotation', 'cw', '90'],
		[' ', 'flip direction %m.flipDirection', 'setflipDirection', 'forward'],
		[' ', 'set speed %n', 'setspeed', 80],
		[" ", "fly to x %n cm y %n cm z %n cm with speed %n cm/s", "go", 50, 50, 0, 50],
		[" ", "fly a curve via x1 %n cm y1 %n cm z1 %n cm to x2 %n cm y2 %n cm z2 %n cm speed %n cm/s", "curve", 20, 20, 0, 60, 40, 0, 60]
		],
 	  'menus': {
        'flipDirection': ['left', 'right', 'forward', 'backward'],
        'direction'    : ['up', 'down', 'forward', 'back', 'left', 'right'],
        'rotation'     : ['cw', 'ccw'],
        'readcommand'  : ['speed?','battery?','time?','height?','temp?','attitude?','baro?','acceleration?','tof?', 'pitch?', 'roll?', 'yaw?']
    },
    url: 'https://github.com/f41ardu/TelloforScratch',
    displayName: 'Tello SDK 1.3.0.0'
};

   // Register the extension
   ScratchExtensions.register('Tello SDK 0.6.1', descriptor, ext);
 })({});
