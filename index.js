var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
//Need to enter username and password for your database
var connString = "postgres://postgres@localhost/assessbox";

var app = express();

app.use(bodyParser.json());
app.use(cors());

//The test doesn't like the Sync version of connecting,
//  Here is a skeleton of the Async, in the callback is also
//  a good place to call your database seeds.
var db = massive.connect({connectionString : connString},
  function(err, localdb){
    db = localdb;
    app.set('db', db);

    app.get('/api/users', function(req, res, next) {
      db.get_users(function(error, response) {
        if (error) {
          res.send(error);
        }
        res.send(response);
      });
    });

    app.get('/api/vehicles', function(req, res, next) {
      db.get_vehicles(function(error, response) {
        if (error) {
          res.send(error);
        }
        res.send(response);
      });
    });

    app.post('/api/users', function(req, res, next) {
      var userArr = [req.body.firstname, req.body.lastname, req.body.email];
      db.create_user(userArr, function(error, response) {
        if (error) {
          res.send(error);
        }
        res.send(response);
      });
    });

    app.post('/api/vehicles', function(req, res, next) {
      var vehicleArr = [req.body.make, req.body.model, Number(req.body.year), Number(req.body.ownerId)];
      db.create_vehicle(vehicleArr, function(error, response) {
        if (error) {
          res.send(error);
        }
        res.send(response);
      });
    });

    app.get('/api/user/:userId/vehiclecount', function(req, res, next) {
      db.get_user_vehicle_count(req.params.userId, function(error, response) {
        if (error) {
          res.send(error);
        }
        res.send(response);
      })
    });

    app.get('/api/user/:userId/vehicle', function(req, res, next) {
      db.get_user_vehicles(req.params.userId, function(error, response) {
        if (error) {
          res.send(error);
        }
        res.send(response);
      });
    });

    app.get('/api/vehicle', function(req, res, next) {
      if (req.query.email) {
        var email = req.query.email;
        db.get_vehicles_from_email(email, function(error, response) {
          if (error) {
            res.send(error);
          }
          res.send(response);
        });
      }
      else if (req.query.userFirstStart) {
        var startLetters = req.query.userFirstStart;
        db.get_vehicles_from_letters(startLetters, function(error, response) {
          if (error) {
            res.send(error);
          }
          res.send(response);
        });
      }
    });

    app.get('/api/newervehiclesbyyear', function(req, res, next) {
      db.get_newer_vehicles(function(error, response) {
        if (error) {
          res.send(error);
        }
        res.send(response);
      });
    });

    app.put('/api/vehicle/:vehicleId/user/:userId', function(req, res, next) {
      var changeArr = [Number(req.params.vehicleId), Number(req.params.userId)];
      db.update_vehicle_ownership(changeArr, function(error, response) {
        if (error) {
          res.send(error);
        }
        res.send(response);
      });
    });

    app.delete('/api/user/:userId/vehicle/:vehicleId', function(req, res, next) {
      var deleteArr = [Number(req.params.userId), Number(req.params.vehicleId)];
      db.delete_ownership(Number(req.params.vehicleId), function(req, res, next) {
        if (error) {
          res.send(error);
        }
        res.send(response);
      });
    });

    app.delete('/api/vehicle/:vehicleId', function(req, res, next) {
      db.delete_vehicle(req.params.vehicleId, function(error, response) {
        if (error) {
          res.send(error);
        }
        res.send(response);
      });
    });

});

app.listen('3000', function(){
  console.log("Successfully listening on : 3000")
});

module.exports = app;
