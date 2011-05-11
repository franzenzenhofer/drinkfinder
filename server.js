var tupalo = require('tupalocomapi');
  try {
  //looking for a token.js file
  //with a value like
  //module.exports.tupalo_token = '86fe2257851XYZb168b67846c6b0f28e'; //(fake) tupalocomtoken
  var token = require('./token/token.js');
  if(token&&token.tupalo_token)
  {
    console.log("**TOKEN MODE**");
    console.log(token.tupalo_token);
    tupalo.setToken(token.tupalo_token);
  }
  else
  {  
    
    console.log("**TOKENLESS MODE**");
    console.log("token is not set")
    console.log("widget and match won't work")
  }
 }
 catch(e)
 {
  console.log("**TOKENLESS MODE**");
  console.log("widget and match won't work")
 }
 

 
var express = require('express');
var io = require('socket.io');
var app = express.createServer();
app.use(express.static(__dirname + '/public'));


var counter = 0;
var stuffAround = function (latitude, longitude, callback, radius, offset)
{
  console.log("counter: "+counter);
  counter++;
  console.log(arguments);
  var radius = radius || 1.5;
  var latitude = latitude || 48.213966;
  var longitude = longitude || 16.336311;
  var callback = callback || function(d){ console.log(d); }
   var offset = offset || 0;
  var data = {
    latitude: latitude,
    longitude: longitude,
    radius: radius,
    includecategories: "bar,club,wine,wine-bars",
    offset: offset
  }
  return tupalo.en.spots(data, callback);
}

var detail = function(spot_id, callback)
{
    var spot_id = spot_id || 'iqlu';
    var callback = callback || function(d){ console.log(d); }
    var data = {
      spot_id:spot_id
    }
    return tupalo.en.spot(data, callback);
}

var widget = function(spot_id, callback)
{
    var spot_id = spot_id || 'iqlu';
    var callback = callback || function(d){ console.log(d); }
    var data = {
      spot_id:spot_id
    }
    return tupalo.en.widget(data, callback);
}




 app.get('/test', function(req, res){
   res.send('Hello World');
 });

 app.listen(8124, '127.0.0.1');
 
 var socket = io.listen(app); 
socket.on('connection', function(client){ 
  // new client is here! 
  client.on('message', function(d){
    console.log(d);
    console.log(d.func)
    if(d.func === 'stuffAround')
    {
      stuffAround(d.latitude, d.longitude, function(d){
        client.send({
          what:'stuffAround',
          data: JSON.parse(d)
        });
      }, d.radius, d.offset);
    }
    else if(d.func === 'widget')
    {
      console.log("widget");
      widget(d.spot_id, function(d){ var sid = d.spot_id+'';
       return function(d){
        console.log(d);
        client.send({
          what:'widget',
          spot_id: sid,
          data: JSON.parse(d)
        });
      }}(d));
    }
    else if(d.func === 'detail')
    {
      console.log("detail");
      detail(d.spot_id, function(d){ var sid = d.spot_id+'';
       return function(d){
        console.log(d);
        client.send({
          what:'detail',
          spot_id: sid,
          data: JSON.parse(d)
        });
      }}(d));
      
    }
  }) 
  client.on('disconnect', function(){ }) 
}); 

