// should require the basic npm packages we've used in class: express and path
var path = require("path");
var express = require("express");
var app = express();
var PORT = 4000;

var htmlRoutes = require("./app/routing/htmlRoutes");
var apiRoutes = require("./app/routing/apiRoutes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./app/public"));

app.use("/",htmlRoutes);
app.use("/api",apiRoutes);


app.listen(PORT,function(){
    console.log("listening on: "+PORT);
});


