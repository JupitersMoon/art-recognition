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
  res.render('index', {
    title: 'Express'
  });
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
    classifier_ids: ['Artists_1217841022'],
    url: req.body.imgur_url
  }; // TEST WITH POWER:  'http://i.imgur.com/cswiXLl.jpg'


  // images_file: fs.createReadStream('./server/public/images/temp-image.PNG')

  console.log("MY PARAMS=", params);

  var watsonResult = {};

  visual_recognition.classify(params, function(err, watsonResult) {
    if (err) {
      console.log(err);
      res.send("MY TUMMY HURTS :(");
    } else {
      var myAnswer = JSON.stringify(watsonResult, null, 2)
      res.json(myAnswer);
    }
  });

  // console.log("WATSON_RESULT= ", myAnswer);


});

//////SAVE TO DB
router.post('/save', function(req, res, next) {

  var artist = req.body.artist
  var score = req.body.score
  var url = req.body.imgur_url

  console.log('imgur_url= ', url);
  console.log('artist= ', artist);
  console.log('score= ', score);

  function saveData(artist, url, score) {
    knex('history')
      .where('user_id', userId)
      .then((data) => {
        res.render('camera.html', {
          artist: artist,
          photo: url,
          score: score
        })
      })
  }
})




/////////GET FROM DB
router.get('/', (req, res, next) => {
    knex.from('history')
        .then((data) => {
            let history = [];
            for (var i = 0; i < data.length; i++) {
                let cardInfo = {
                    id: data[i].id,
                    artist: data[i].name,
                    score: data[i].score
                };
                history.push(cardInfo);
            }
            res.send(history);
        })
        .catch((err) => {
            next(err);
        });
});

router.get('/:id', (req, res, next) => {
    let myId = parseInt(req.params.id);
    // console.log(req.body);
    knex.from('history')
        .where({
            id: myId
        })
        .first()
        .then((data) => {
          let cardInfo = {
              id: data[i].id,
              artist: data[i].name,
              score: data[i].score
          };
          res.send(cardInfo);
        })
        .catch((err) => {
            next(err);
        });
});


////////DELETE ON DB
router.delete('/:id', (req, res, next) => {
    var deleteCard;
    console.log(req.params.id);
    knex('history')
        .where('id', req.params.id)
        .first()
        .then((responseData) => {
            deleteCard = responseData;
            return knex('history')
                .del()
                .where('id', req.params.id);
        })
        .then(() => {
          delete deleteCard.created_at;
          delete deleteCard.updated_at;
          res.send(deleteCard);
        })
        .catch((err) => {
          next(err);
        });
});





module.exports = router;



// module.exports = router;
