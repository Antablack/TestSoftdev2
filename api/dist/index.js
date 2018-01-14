"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = require("./app");
var port = process.env.PORT || 3000;
_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect("mongodb://localhost:27017/testsoftdev").then(function () {
    console.log("connetions database succesull...");
    app.listen(port, function () {
        console.log("server run in port " + port);
    });
}).catch(function (err) {
    console.log("error database Connection -->" + err);
});