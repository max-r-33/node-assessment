var express = require('express');
var bodyParser = require('body-parser');
var users = require('./users.json');

var app = express();

app.use(bodyParser.json());

app.get('/api/users', function(req, res, next) {
    var result = [];
    if (req.query.language) {
        result = users.filter(function(user) {
            return user.language === req.query.language;
        });
        res.json(result);
    }else if(req.query.age){
        result = users.filter(function(user){
          return user.age == req.query.age;
        });
        res.json(result);
    }else if(req.query.city){
      result = users.filter(function(user){
        return user.city.toLowerCase() === req.query.city.toLowerCase();
      });
      res.json(result);
    }else if(req.query.state){
      result = users.filter(function(user){
        return user.state.toLowerCase() === req.query.state.toLowerCase();
      });
      res.json(result);
    }else if(req.query.gender){
      result = users.filter(function(user){
        return user.gender.toLowerCase() === req.query.gender.toLowerCase();
      });
      res.json(result);
    } else {
        res.json(users);
    }
});

app.get('/api/users/:id', function(req, res, next) {
    var result = [];

    if (!isNaN(req.params.id)) {
        result = users.filter(function(user) {
            return user.id == req.params.id;
        });
        if (result[0]) {
            res.json(result[0]);
        } else {
            res.sendStatus(404);
        }
    } else {
        result = users.filter(function(user) {
            return user.type === req.params.id;
        });
        res.json(result);
    }
});

app.post('/api/users', function(req, res, next) {
    var newId = users[users.length - 1].id + 1;
    var f = [];
    console.log(req.body.favorites);
    f.push(req.body.favorites);
    var newUser = {
        id: newId,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        gender: req.body.gender,
        language: req.body.language,
        age: req.body.age,
        city: req.body.city,
        state: req.body.state,
        type: req.body.type,
        favorites: f
    };
    users.push(newUser);
    res.json(newUser);
});

app.post('/api/users/:type', function(req, res, next) {
    var newId = users[users.length - 1].id + 1;
    var f = [];
    console.log(req.body.favorites);
    f.push(req.body.favorites);
    var newUser = {
        id: newId,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        gender: req.body.gender,
        language: req.body.language,
        age: req.body.age,
        city: req.body.city,
        state: req.body.state,
        type: req.params.type,
        favorites: f
    };
    users.push(newUser);
    res.json(newUser);
});

app.post('/api/users/language/:id', function(req, res, next){
    var newLang = req.body.language;
    var userId = req.params.id;
    var result = {};
    for (var i = 0; i < users.length; i++) {
      if(users[i].id === parseInt(userId)){
        users[i].language = newLang;
        result = users[i];
      }
    }
    res.json(result[0]);
});

app.post('/api/users/forums/:id', function(req, res, next){
    var uID = req.params.id;
    var fav = req.body.add;
    for (var h = 0; h < users.length; h++) {
      if(users[h].id == uID){
          users[h].favorites.push(fav);
          res.sendStatus(200);
      }
    }
});

app.delete('/api/users/forums/:id', function(req, res, next){
      var toRemove = req.query.favorite;
      var usID = req.params.id;
      for (var y = 0; y < users.length; y++) {
        if(users[y].id == usID){
          console.log(users[y]);
          console.log(toRemove);
          for (var x = 0; x < users[y].favorites.length; x++) {
            if(users[y].favorites[x] == toRemove || users[y].favorites[x] === undefined){
              users[y].favorites.splice(x, 1);
              res.json(users[y].favorites);
            }
          }
        }
      }
});

app.delete('/api/users/:id', function(req, res, next){
    var idToRemove = req.params.id;
    for (var b = 0; b < users.length; b++) {
      if(users[b].id == idToRemove){
        users.splice(b, 1);
        res.sendStatus(200);
      }
    }
});

app.put('/api/users/:id', function(req, res, next){
    var i = req.params.id;
    for (var t = 0; t < users.length; t++) {
      if(users[t].id == i){
        for(var key in req.body){
          users[t][key] = req.body[key];
        }
        res.json(users[t]);
      }
    }

});

app.listen(3000, function() {
    console.log('listening on 3000');
});

module.exports = app;
