var mongo = require('mongodb').MongoClient;
var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(express.static(__dirname + "/../client"));
app.use(bodyParser.json());

var db;
mongo.connect('mongodb://localhost:27017/pizzaPlanet', function (err, database) {
    if (err) {
        console.log(err);
    } else {
        db = database;
    }
});

app.route("/api/locations")
    .get(function (req, res) {
        db.collection('locations').find().toArray(function (err, locations) {
            if (err) { 
                console.log(err); 
                res.sendStatus(500);
            } else {
                res.send(locations);
            }
        });
    }).post(function (req, res){
        db.collection('locations').insertOne (req.body, function (err, locations) {
            // name: req.body.name,
            // delivers: req.body.delivers,
            // phone: req.body.phone,
            // address:
            // {
            //     line1: req.body.address.line1,
            //     line2: req.body.address.line2,
            //     city: req.body.address.city,
            //     state: req.body.address.state,
            //     zip: req.body.address.zip
            // }
            if (err) {
                res.sendStatus(500);
            } else {
                res.send(locations);
        }
        })
    });

app.route("/api/locations/:id/reviews")
    .post(function (req, res) {
        res.send(req.body);
    })

app.route("api/locations:id") 
    .get(function (req,res) {

    })

    .delete(function (req,res) {

    })

    


app.listen(3000);
