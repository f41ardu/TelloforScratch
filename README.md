# TelloforScratch
TelloforScratch


# Sources: 

https://github.com/LLK/scratchx/wiki#reporter-blocks

https://mryslab.github.io/s2-pi/

Listen on UDP socket 

https://www.hacksparrow.com/node-js-udp-server-and-client-example.html

Two udp listener needed:
one to listen to all fligh commands
a second one to listen to response to state commands

What is the best software architecture to implement this? 

First I'll remove the setReceive function. 
Could make it much simpler. 

After removig setReceived I've implemented a second udp listener. 
Seems to work.
Now a second repeater is required to test the respons behaviour. 
Require is now a dictionary in repeater.js to send response 
to the correct listener.  

### Preparation ### 

Using experimental extensions in Scratch2 require nodejs installed. 

If not already installed first install nodejs on your Raspberry PI.

Check if nodejs is installed?

`$ node -v
v8.11.1`

or any other release. 

In case nodejs is not installed. 

`$ node -v
bash: node: command not found
`
Install nodejs: 

`$ sudo apt install -y nodejs`


### Extension Installation - Using File Menu ###

To install using this method, while holding the Shift key 
on your keyboard, click on the File menu choice at the top 
of the Scratch 2 window. Select Import Experimental Extension
and you will be prompted for a URL to load the file. 

You need to supply the full path and file name of the JavaScript 
extension for the URL.  


The path and file I'm using is:

`/home/pi/code/TelloforScratch/TelloScratch_2.js`

Please use your own path!
 
 
 
