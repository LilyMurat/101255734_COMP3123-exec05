const express = require('express');
const app = express();
const router = express.Router();

const fs = require("fs");
const path = require("path");

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get('/home', (req,res) => {
  res.sendFile("home.html", {root: __dirname});
});

/*
- Return all details from user.json file to client as JSON format
*/

let dataReadFromUserJSONFile = fs.readFileSync(path.resolve(__dirname, "user.json"));
let parsedDataOfUser = JSON.parse(dataReadFromUserJSONFile);

router.get('/profile', (req,res) => {
  res.json(parsedDataOfUser);
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.get('/login', (req,res) => {

  let usernameFromQStr = req.query.username;
  let passwordFromQStr = req.query.password;

  let dataFromUserJSON = fs.readFileSync(path.resolve(__dirname, "user.json"));

  let parsedDataOfUser = JSON.parse(dataFromUserJSON);

  let storedUsrnameFromJSONFile = parsedDataOfUser.username;
  let storedPswrdFromJSONFile = parsedDataOfUser.password;

  if (storedUsrnameFromJSONFile === usernameFromQStr && storedPswrdFromJSONFile === passwordFromQStr) {
    res.json({
      status: true,
      message: "User Is valid",
    });
  } else if (storedUsrnameFromJSONFile !== usernameFromQStr) {
    res.json({
      status: false,
      message: "User Name is invalid",
    });
  } else if (storedPswrdFromJSONFile !== passwordFromQStr) {
    res.json({
      status: false,
      message: "Password is invalid",
    });
  }
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout/:username', (req,res) => {
  res.setHeader("Content-type", "text/html");
  res.send(`<b>${req.params.username} successfully logout.<b>`);
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));