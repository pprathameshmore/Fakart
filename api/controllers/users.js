const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.user_sign_up = (request, response, next) => {

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
}

exports.users_log_in = (request, response, next) => {
    User.findOne({
        email: request.body.email
    }, (error, user) => {
        if (error) {
            response.status(404).json({
                message: "Auth failed",
                error
            });
            return;
        }

        bcrypt.compare(request.body.password, user.password, (error, isValid) => {
            if (error) {
                response.status(401).json({
                    message: "Auth failed"
                });
                return;
            } else if (isValid) {
                const token = jwt.sign({
                    email: user.email,
                    userId: user._id
                }, "secret", {
                    expiresIn: "1h"
                });
                response.setHeader('Content-Type', 'application/json');
                response.status(200).json({
                    message: "Auth successful",
                    token
                });
                return;
            }
            response.status(401).json({
                message: "Auth falied"
            });
            return;
        });
    }).catch((error) => {
        response.json({
            error
        });
    });
}

exports.user_delete = (request, response, next) => {
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
}