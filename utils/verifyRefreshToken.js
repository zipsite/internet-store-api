const jwt = require("jsonwebtoken")
const UserToken = new (require("../models/UserToken.js"))()

const verifyRefreshToken = (refreshToken) => {
    const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;

    return new Promise((resolve, reject) => {
        const userToken = UserToken.where("token", refreshToken)

        if (userToken.error)
            return reject({ error: true, message: "Invalid refresh token" });

        jwt.verify(refreshToken, privateKey, (err, tokenDetails) => {

            if (err)
                return reject({ error: true, message: "Invalid refresh token" });
            
            resolve({
                tokenDetails,
                error: false,
                message: "Valid refresh token",
            });
        });
    });
};

module.exports = verifyRefreshToken;