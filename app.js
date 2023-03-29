var express = require ("express");
var index = express();
var port = 3000;
index.get("/" , (req, res) => {
    res.send("HELLO USER");
});
index.listen(port , () => {
    console.log("hello this is Server listening on port " + port);
});
 index.use("/", (req , res) => {
     res.sendFile(__dirname + "/index.html");
 });
 
app.use("/",(req ,res) => {
	res.sendFile(__dirname + "/index.html");
});

var mongoose =require("mongoose");
require("mongoose";
	mongoose.Promise = global.Promise;mongoose.connect("mongo://localhost:27017/node-demo");

var User=mongoose.model("User",nameSchema);

app.post("/addname",(req res)
	=>{

	});