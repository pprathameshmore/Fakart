const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.user_sign_up = (request, response, next) => {
    User.find({
        email: request.body.email
    }).exec().then(user => {
        if (user.length >= 1) {
            return response.status(409).json({
                message: "User exists"
            });
        } else {
            bcrypt.hash(request.body.password, 10, (error, hash) => {
                if (error) {
                    return response.status(500).json({
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
                            });
                        }
                    });
                }
            });
        }
    }).catch(error => {
        return response.status(404).json({
            error
        });
    });
}

exports.users_log_in = (request, response, next) => {


    User.findOne({
        email: request.body.email
    }).exec().then(user => {
        bcrypt.compare(request.body.password, user.password, (error, isValid) => {
            if (error) {
                return response.status(401).json({
                    message: "Auth failed",
                    error
                });
            } else if (isValid) {
                const token = jwt.sign({
                    email: user.email,
                    userId: user._id
                }, "secret", {
                    expiresIn: "1h"
                });
                return response.status(200).json({
                    message: "Auth successful",
                    token
                });
            }
            return response.status(401).json({
                message: "Auth falied"
            });
        });
    }).catch(error => {
        return response.status(404).json({
            message: "Auth failed",
            error
        });
    });
}

exports.user_delete = (request, response, next) => {

    User.findByIdAndDelete({
        _id: request.params.userID
    }).exec().then(user => {

        if (user === null) {
            return response.status(404).json({
                message: "User doesn't exists"
            });
        } else {
            return response.status(200).json({
                message: "User removed",
                user
            });
        }

    }).catch(error => {
        return response.status(404).json({
            message: "Something went wrong",
            error
        });
    });
}