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
   // /home/pi/code/TelloforScratch/TelloScratchSimple.js
   // Tello udp port and IP address
   var PORT = 8889 ;
   var HOST = '192.168.10.1'; // Tello IP
   // var HOST = '127.0.0.1'; // Test localhost (debug mode)
   
   // udp connector  
   var dgram = require('dgram');
   // client connector (send commands) 
   var client = dgram.createSocket('udp4');
   
   // initial variables
   var myStatus = 1; // initially set status to yellow
   var connected = false; // initially set connected to false
     
   // Cleanup function when the extension is unloaded

   ext._shutdown = function() {
	   server1.close();
   };

   // Status reporting code

   // Use this to report missing hardware, plugin

   // or unsupported browser

   ext._getStatus = function() {
     return {status: myStatus, msg: 'Ready'};
   };
   
   // Send command and set Tello into SDK mode
   ext.sendcommand = function (callback) {
   myStatus = 2; // initially set status to yellow
   var message = new Buffer('command');
    
 	client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
		if (err) { 
			alert("Command could not send: " + err);
			client.close();
			}
		});
   };
   
   // Send takeoff
   ext.takeoff = function (callback) {
   
   var message = new Buffer('takeoff');
     
	client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
		//if (err) throw err;
		//client.close();
		});
   };
   
   // Send land
   ext.land = function (callback) {
   
   var message = new Buffer('land');

	client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
		//if (err) throw err;
		//client.close();
		}); 
   };
   
    // Send set speed
   ext.setspeed = function (val,callback) {
   
   var message = new Buffer('speed ' + val);

	client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
		//if (err) throw err;
		//client.close();
		});   
   };
 
   // Send set fly direction and distance to fly
   ext.flydir = function (direction, distance, callback) {
   
   var message = new Buffer(direction + ' ' + distance);

	client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
		//if (err) throw err;
		//client.close();
		});
   };
   
   // Send rotation direction and rotation angle
   ext.rotation = function (direction, angle, callback) {
   
   var message = new Buffer(direction + ' ' + angle);

	client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
		//if (err) throw err;
		//client.close();
		});
   };

   // Send set flip Direction
   ext.setflipDirection = function (val,callback) {
   
   var message = new Buffer('flip ' + val.charAt(0));

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
		[' ', 'Send command', 'sendcommand'],
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
        'rotation'     : ['cw', 'ccw']
    },
    url: 'https://github.com/f41ardu/TelloforScratch',
    displayName: 'Tello SDK 1.3.0.0'
};

   // Register the extension
   ScratchExtensions.register('Tello SDK 0.2.0', descriptor, ext);
 })({});
