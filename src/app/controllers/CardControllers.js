const myModel = require('../models/card')
const myDeck = require('../models/deck')
const mongoose = require('mongoose');

class CardControllers {

    // [GET] /
    index(req, res, next) {
        res.redirect('/api/new/shuffle')
    };
    
    // [GET] /api/new/shuffle
    async api(req, res, next) {
        var id;
        const resetCard = await myModel.updateManyWithDeleted({},{deleted: false})
        resetCard.save
        const newDeck = new myDeck({
            _id: new mongoose.Types.ObjectId(),
            cards: 
            [
                '634791b69c404afc6909a642',
                '634795b99c404afc6909a64f',
                '634795f79c404afc6909a650',
                '634796279c404afc6909a651',
                '634796509c404afc6909a652',
                '634796699c404afc6909a653',
                '6347967e9c404afc6909a654',
                '6347969b9c404afc6909a655',
                '634796b79c404afc6909a656',
                '634796d49c404afc6909a657',
                '634796fd9c404afc6909a658',
                '634797239c404afc6909a659',
                '6347975f9c404afc6909a65a',
            ]
        })
        
        await newDeck.save((err) => {
            if(err) return new Error('Error at: ', err);
            id = newDeck._id
            Promise.all([myDeck.findOne({_id:id})])
            .then(([deck]) => {
                const count = deck.cards.length
                res.render('home',{
                    success: true,
                    shuffle: true,
                    remaining: count,
                    deck_Id: deck._id
                })
            })
            .catch((err) => {
                res.json({
                    success: false,
                    error: `Error At: ${err}`
                })
            })
        })
    }

    // [GET] api/:deckId/shuffle
    async shuffle(req, res, next) {
        var id = req.params.deckId;
        var arr = [
            '634791b69c404afc6909a642',
            '634795b99c404afc6909a64f',
            '634795f79c404afc6909a650',
            '634796279c404afc6909a651',
            '634796509c404afc6909a652',
            '634796699c404afc6909a653',
            '6347967e9c404afc6909a654',
            '6347969b9c404afc6909a655',
            '634796b79c404afc6909a656',
            '634796d49c404afc6909a657',
            '634796fd9c404afc6909a658',
            '634797239c404afc6909a659',
            '6347975f9c404afc6909a65a'
        ]
        const resetCard = await myModel.updateManyWithDeleted({},{deleted: false})
        resetCard.save

        const doc = await myDeck.findOne({_id: id})
        doc.cards = arr;
        await doc.save().then(savedDoc => {
            savedDoc === doc; // true   
          });
        myDeck.findOne({_id: id})
        .then((data) => {
            res.render('home',{
                success: true,
                shuffle: true,
                deck_Id: data._id,
                remaining: data.cards.length
            })
        })
        .catch((err) => {
            res.json({
                success: false,
                deck_Id: data._id,
                error: `Error At: ${err}`
            })
        })        
    }

    // [GET] api/:deckId/draw/?count='How many cards to draw'
    async draw(req, res, next) {
        const limitDraw = req.query.count||2;
        var id = req.params.deckId;
        Promise.all([
            myModel.count(),
            myDeck.findOne({_id: id})
        ])
        .then(([count, deckId]) => {
            if(count <= 1) {
                // DELETE THIS TO UPLOAD API ONLINE
                return res.render('home',{
                    success: false,
                    deck_Id: deckId._id,
                    cards:[],
                    remaining: 0,
                    error: `Not enough cards remaining to draw ${limitDraw} additional`
                })
            }
            var randomCard = Math.floor(Math.random() * count-1);
            if(randomCard < 0) {
                randomCard = 1
            }
            Promise.all([
                myModel.find().skip(randomCard).limit(limitDraw),
                myDeck.findOne({_id: id}),
            ])
            .then(([data, deck]) => {
                let cards = data.map((dta) => {
                    deck.cards.map((a,b) => {
                        if(a.toString() == dta._id.toString()) {
                            deck.cards.splice(b, 1,)
                        }
                    })
                    dta.deleted = true
                    dta.save()
                    return dta.toObject()
                })
                deck.save()
                const remaining = count - cards.length
                res.render('home',{
                    success: true,
                    deck_Id: deck._id,
                    cards,
                    card1: cards[0],
                    card2: cards[1],
                    remaining,
                })
            })
            .catch((err) => res.json({
                success: false,
                deck_Id: deckId._id,
                error: `Error at: ${err}`
            }))
        })
        .catch((err) => res.json({
            success: false,
            deck_Id: deckId._id,
            error: `Error at: ${err}`
        }))
    }
}

module.exports = new CardControllers;
