var result;
var maximum = -145;
var minimum = 145;
var randomnumber = Math.round((Math.random() * (maximum - minimum + 1)) + minimum);
var string = "pitch:34;roll:-127;yaw:69;vgx:0;vgy:0;vgz:0;templ:81;temph:83;tof:"+randomnumber+";h:0;bat:10;baro:1.06;time:2;agx:727.00;agy:434.00;agz:447.00;"

// result = string.split(","); 
var array = string.split(';').map(function (a) { return a.split(':'); });
console.log(array[0][1] + ';' + array[1][1] + ';' + array[2][1]);
