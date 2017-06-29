// var express = require('express');
// var router = express.Router();



//////////////////////////////////////

const express = require('express');
const router = express.Router();
const http = require('http');
const https = require('https');
const watson = require('watson-developer-cloud');
const fs = require('fs');
const bodyParser = require('body-parser')



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});




router.patch('/watson', function(req, res, next) {

  console.log('imgur_url= ', req.body.imgur_url);

  // Write out the image data to file
  // fs.writeFile('./server/public/images/temp-image.PNG', base64Image, 'base64', function(err) {
  //   console.log(err);
  // });


  // DO YOUR WATSON STUFF HERE
  var visual_recognition = watson.visual_recognition({
    api_key: '67dc30edab4b1145e7f6a7ed8fc02e6522408aaa',
    version: 'v3',
    version_date: '2016-05-20'
  });

  var params = {
    classifier_ids: ['Artists_20950349'],
    url: req.body.imgur_url
  };   // TEST WITH POWER:  'http://i.imgur.com/cswiXLl.jpg'


  // images_file: fs.createReadStream('./server/public/images/temp-image.PNG')

  console.log("MY PARAMS=", params);

  visual_recognition.classify(params, function(err, res) {
    if (err)
      console.log(err);
    else
      console.log(JSON.stringify(res, null, 2));
  });


  res.send("WOO SUCCESS");

});




module.exports = router;



//////////////////////////////////////////






module.exports = router;
