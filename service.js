// Install following packages.
// npm install express body-parser
// npm install express
// npm install http

var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();
const bodyparser = require("body-parser");

// https://mongodb.github.io/node-mongodb-native/3.3/quick-start/quick-start/
 var MongoClient = require('mongodb').MongoClient;

// Moongodb URL
 var url = "mongodb://localhost:27017/";


http.createServer(function (req, res) {
    fs.readFile('webassignment.html', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
    });
}).listen(8080);

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Pass to next layer of middleware
    next();
});

// middleware

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.post('/save', function (req, res) {

    saveStudentDetails(req.body);
    res.end(JSON.stringify({ 'status': 'OK' }));
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})

function saveStudentDetails(data) {
    console.log(data);

    

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("studentDB");
        var myobj = { name: data.studentName, 
                        rollno: data.rollNo,
                        semester: data.semester,
                        daa: data.daa,
                        se: data.se,
                        web: data.web,
                        dbms: data.dbms,
                        cn: data.cn };
        dbo.collection("student").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
      });


    
}