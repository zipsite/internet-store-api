const jwt = require("jsonwebtoken")
const UserToken = new (require("../models/UserToken.js"))()

const generateTokens = async (user) => {
    try {
        const payload = { id: user.id, role: user.role};
        const accessToken = jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_PRIVATE_KEY,
            { expiresIn: "14m" }
        );
        const refreshToken = jwt.sign(
            payload,
            process.env.REFRESH_TOKEN_PRIVATE_KEY,
            { expiresIn: "30d" }
        );

        const userToken = UserToken.where("userId", user._id);
        if (!userToken.error) UserToken.delete(userToken.id);

        UserToken.create({ userId: user._id, token: refreshToken })
        return Promise.resolve({ accessToken, refreshToken });
    } catch (err) {
        return Promise.reject(err);
    }
};

module.exports = generateTokens;