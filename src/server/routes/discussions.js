var express = require('express');
var router = express.Router();
var Discussion = require('../models/discussion');

// GET ALL discussions
router.get('/', function (req, res, next) {
    Discussion.find({})
        .then(function(discussions) {
            console.log('discussions objects', discussions);
            res.status(200).json({
                status: 'success',
                data: discussions
            });
        })
        .catch(function (err) {
            return next(err);
        });
});

// GET single discussions
router.get('/:id', function (req, res, next) {
    Discussion.findById(req.params.id)
        .then(function (discussion) {
            res.status(200).json({
                status:'success',
                data: discussion
            });
        })
        .catch(function (err) {
            return next(err);
        });
});

// add discussion
router.post('/', function (req, res, next) {
    var discussion = new Discussion(req.body);
    discussion.save()
        .then(function (discussion) {
            res.status(200).json({
                status: 'success',
                data: discussion
            });
        })
        .catch(function (err) {
            return next(err);
        });
});

// update discussion
router.put('/:id', function (req, res, next) {

    Discussion.findByIdAndUpdate(req.params.id, req.body, {new:true})
        .then(function (discussion) {

            res.status(200).json({
                status: 'success',
                data: discussion
            });
        })
        .catch(function (err) {
            return next(err);
        });
});

//Change vote


// remove discussion
router.delete('/:id', function (req, res, next) {
    Discussion.findByIdAndRemove(req.params.id)
        .then(function (discussion) {
            res.status(200).json({
                status: 'success',
                data: discussion
            });
        })
        .catch(function (err) {
            return next(err);
        });
});


module.exports = router;