let express = require('express');
let app = express();
let bodyParser = require("body-parser")


app.use(bodyParser.urlencoded({ extended: false }))

//Implement a Root-Level Request Logger Middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next()
})

//1
//console.log("Hello World")

//2
// app.get("/", (req, res) => {
//   res.send('Hello Express')
// })

// 3
 app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
})

app.use("/public", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
//Serve JSON on a Specific Route
// app.get("/json", (req, res) => {
//   res.json({ "message": "Hello json"})
// })

 // Use the .env File
app.get("/json", (req, res) => {
  if ( process.env["MESSAGE_STYLE"] == "uppercase"){
    res.json({"message": "HELLO JSON"})
  } else {
    res.json({'message': "Hello json"})
    }
})


// //Implement a Root-Level Request Logger Middleware
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.path} - ${req.ip}`);
//   next()
// })


//Chain Middleware to Create a Time Server
app.get("/now", (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({"time": req.time })
})

//Get Route Parameter Input from the Client 
app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({
    echo: word
  });
});


//Get Query Parameter Input from the Client
app.get("/name", function(req, res) {
  var firstName = req.query.first;
  var lastName = req.query.last;
  // OR you can destructure and rename the keys
  var { first: firstName, last: lastName } = req.query;
  // Use template literals to form a formatted string
  res.json({
    name: `${firstName} ${lastName}`
  });
});


// Get Data from POST Requests 
app.get("/name", (req, res) => {
  res.json( { name: req.query.first + '' + req.query.last } )
})

app.post("/name", function(req, res) {
  // Handle the data in the request
  var string = req.body.first + " " + req.body.last;
  res.json({ name: string });
});

 module.exports = app;
