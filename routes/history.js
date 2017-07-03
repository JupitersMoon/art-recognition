'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');


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

router.post('/', (req, res, next) => {
  console.log(req.body);
    let newCard = {
      id: data[i].id,
      artist: data[i].name,
      score: data[i].score
    };
    knex('history')
        .insert(newCard)
        .then(
            res.send(newCard)
        )
        .catch((err) => {
            next(err);
        });
});

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
