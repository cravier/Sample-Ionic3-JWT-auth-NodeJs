var express    = require('express');
var bodyParser = require('body-parser');
var jwt        = require('jsonwebtoken');
var app        = express();
var cors       = require('cors');


var ourUser = {
  username : "sample",
  password : "jwtlogin"
}


var fakeData = [
    {text: "Ionic"},
    {text: "Is"},
    {text: "Pretty"},
    {text: "Cool"},
    {text: "To"},
    {text: "use"}
]


const secret = 'RandomLettersAndNumbers'

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

const auth = express.Router();
const api = express.Router();



function handle_FakeData(req,res) {
    res.json(fakeData);
}




// GET
api.get('/getFakeData', function(req, resp){
   handle_FakeData(req,resp);
});

auth.post('/login', function(req, res){
  if (req.body) {
    var username = req.body.username.toLocaleLowerCase();
    var password = req.body.password;

    if (username === ourUser.username && password === ourUser.password) {
      const token = jwt.sign({iss: 'localhost:1338', role: 'user'}, secret);
      res.status(200).json({success: true, token: token, username: username});
    }else {
      res.status(400).json({success: false, message: "Incorrect username/password"});
    }
  }else {
    res.status(400).json({success: false, message: "Missing data"})
  }
});

app.use('/api', api); //:1338/api/...
app.use('/auth', auth); //:1338/auth/...
app.listen(1338);
