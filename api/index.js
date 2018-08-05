var mongoose = require("mongoose");
var app = require("./app");
var port = 5000;
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://root:root@localhost:27017/testsoftdev?authSource=admin").then(() => {
    console.log("connections database successful...");
     app.listen(port, function () {
        console.log("server run in port ->" + port);
    }) 
}).catch((err) => {
    console.log("error database Connection -->" + err)
})