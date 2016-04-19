var express = require('express');
var router = express.Router();
var moment = require('moment');
var jwt = require('jwt-simple');

var User = require('../models/users')
var config = require('../../_config');


router.post('/register', function(req, res, next) {
    //ensure user does not already exist
    User.findOne({email: req.body.email}, function(err, existingUser) {
        if (err) {
            return next(err)
        }
        //user already exists error
        if (existingUser) {
            return res.status(409)
                .json({
                    status: 'fail',
                    message: 'Email Already Exists'
                });
        }
        //create a new user
        var newUser = new User(req.body);
        newUser.save(function(){
            //create token
            var token = generateToken(newUser);
            res.status(200)
                .json({
                    status: 'success',
                    data: {
                        token: token,
                        user: newUser.email
                    }
                })
        })
    })
    .catch(function (err) {
        return next(err);
    });
});

router.post('/login', function (req, res, next) {
    // ensure that user exists
    User.findOne({email: req.body.email})
        .then(function (user) {
            if (!user) {
                return res.status(401).json({
                    status: 'fail',
                    message: 'Email does not exist'
                });
            } else
                user.comparePassword(req.body.password, function (err, match) {
                    if (err) {
                        return next(err);
                    }
                    if (!match) {
                        return res.status(401).json({
                            status: 'fail',
                            message: 'Password is not correct'
                        });
                    }
                    user = user.toObject();
                    // delete user.password;
                    var token = generateToken(user);
                    res.status(200).json({
                        status: 'success',
                        data: {
                            token: token,
                            user: user.email
                        }
                    });
                });
        })
        .catch(function (err) {
            return next(err);
        });
});

//*** helpers ** //

// generate a token
function generateToken (user) {
    var payload = {
        //expiration date
        exp: moment().add(14, 'days').unix(),
        //initialization date
        iat: moment().unix(),
        sub: user._id
    }
    return jwt.encode(payload, config.TOKEN_SECRET);
}
//endsure authentifated
function ensureAuthenticated(req, res,next) {
    if(!(req.headers && req.headers.authorization)) {
        return res.status(401)
            .json({
                status: 'fail',
                message: 'No header present or no authorization header'
            });
    }
    //decode the token
    var header = req.headers.authorization.split('');
    var token = header[1];
    var payload = jwt.decode(token, config.TOKEN_SECRET)
    var now = moment().unix();

    //ensure that it is valid
    //ensure token hasn't expired
    if (now > payload.exp) {
        return res.status(401)
            .json({
                status: 'fail',
                message: 'Token has expired'
            });
    }

    //ensure user is still in the database
    User.findById(payload.sub, function(err, user) {
        if (err) { return next(err)
        }
        if (!user) {
            return res.status(400
                .json({
                    status: 'faill',
                    message: 'User does not exist'
                })
            )}
        //attach user to request object
        req.user = user;
        //call next middleware function
        next();
    });
}

//ensure admin
function ensureAdmin(req,res,next) {
    //check for the user object
    //check for admin === true on user object
    if(!(req.user && req.user.admin)) {
        //throw error
        return res.status(401)
            .json({
                status: 'fail',
                message: 'User is not authorized'
            })
    }
    next();
}


module.exports = router;