// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var url = require('url');
var http = require('http');


app.use(express.static('public'));


app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');

 
  
  //response.end(JSON.stringify(urlParsed));

});
app.get('*',function(request,response){
  
  if (request.url != "/") {
    response.writeHead(200, { "Content-Type": "text/html" });
   // var urlParsed = url.parse(request.url,true);
    var urlString = (request.url).substring(1);
    var date;
    var unix;
    //check if it is unix or natural date 
    if(urlString.includes("%20")===true){
      urlString = urlString.split('%20').join('');
      date= new Date(""+urlString);
      unix = new Date(""+urlString).getTime() / 1000;
      //new Date('2012.08.10').getTime() / 1000
    }
    else if(!isNaN(urlString)){
      unix = urlString;
      date = new Date(urlString*1000);
    }
    else if(isNaN(urlString)){
      unix = "null";
      date = "null";
    }
    
    
    var result = {unix:unix, natural:date};
    
    
    response.end(JSON.stringify(result));
   
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


