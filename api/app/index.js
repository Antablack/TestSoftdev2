import mongoose from "mongoose";
var app = require("./app");
var port = process.env.PORT || 3000;
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/testsoftdev").then(() => {
    console.log("connetions database succesull...");
     app.listen(port, function () {
        console.log("server run in port " + port);
    })
}).catch((err) => {
    console.log("error database Connection -->" + err)
})