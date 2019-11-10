const jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {

    try {
        const token = request.headers.authorization.split(" ")[1];
        const decode = jwt.verify(token, "secret");
        request.userData = decode;
        next();
    } catch (error) {
        response.status(401).json({
            message: "Auth failed"
        });
    }
}