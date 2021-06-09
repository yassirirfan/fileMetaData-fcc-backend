const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
require('dotenv').config()

var app = express();

app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload());
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', function(req, res) {
  
  if(req.files == null){
    res.send("<h1> You haven't uploaded any File </h1>")
  }
  
  let file = req.files.upfile; 

  res.json({
    name:file.name,
    type:file.mimetype,
    size:file.size
  })
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
