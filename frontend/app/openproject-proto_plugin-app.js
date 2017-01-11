var app = angular.module('openproject');

app.controller('KittensController', ['$scope', '$http', require('./controllers/kittens.js')]);
