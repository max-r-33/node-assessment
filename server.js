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
            res.send(404);
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
        favorites: req.body.favorites
    };
    users.push(newUser);
    res.json(newUser);
});

app.post('/api/users/:type', function(req, res, next) {
    var newId = users[users.length - 1].id + 1;

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
        favorites: req.body.favorites
    };
    users.push(newUser);
    res.json(newUser);
});


app.listen(3000, function() {
    console.log('listening on 3000');
});

module.exports = app;
