const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');

router.post('/signup', (request, response, next) => {

    User.find({
        email: request.body.email
    }, (error, user) => {
        if (error) {
            response.status(404).json({
                error
            })
        } else {
            if (user.length >= 1) {
                response.status(409).json({
                    message: "User exists"
                });
            } else {
                bcrypt.hash(request.body.password, 10, (error, hash) => {
                    if (error) {
                        response.status(500).json({
                            error
                        });
                    } else {
                        const user = new User({
                            email: request.body.email,
                            password: hash
                        });
                        user.save((error, user) => {
                            if (error) {
                                response.status(404).json({
                                    error
                                });
                            } else {
                                response.status(201).json({
                                    message: "User created",
                                    user
                                });
                            }
                        });
                    }
                });
            }
        }
    });
});

router.delete('/:userID', (request, response, next) => {
    User.findByIdAndDelete({
        _id: request.params.userID
    }, (error, user) => {
        if (error) {
            response.status(404).json({
                message: "User not found",
                error
            });
        } else {
            response.status(200).json({
                message: "User removed",
                user
            });
        }
    })
});

module.exports = router;