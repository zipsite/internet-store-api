const User = new (require("../../models/User.js"))();
const UserToken = new (require("../../models/UserToken.js"))()
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const generateTokens = require("../../utils/generateTokens.js")
const verifyRefreshToken = require("../../utils/verifyRefreshToken.js")
const verifyAccessToken = require("../../utils/verifyAccessToken.js")


module.exports = class AuthController {
    async signup(req, res) {
        try {
            const user = User.where("email", req.body.email);
            if (user.email)
                return res
                    .status(400)
                    .json({ error: true, message: "User with given email already exist" });

            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            const hashPassword = await bcrypt.hash(req.body.password, salt);

            let result = User.create({ ...req.body, password: hashPassword });
            if (result.error == true) {
                return res
                .status(400)
                .json(result)
            }
            res
                .status(201)
                .json({ error: false, message: "Account created sucessfully" });
        } catch (err) {
            res.status(500).json({ error: true, message: "Internal Server Error" });
        }
    }
    async login(req, res) {
        try {
            const user = User.where("email", req.body.email);
            if (user.error)
                return res
                    .status(401)
                    .json({ error: true, message: "Invalid email or password" });

            const verifiedPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!verifiedPassword)
                return res
                    .status(401)
                    .json({ error: true, message: "Invalid email or password" });

            const { accessToken, refreshToken } = await generateTokens(user);

            res.status(200).json({
                error: false,
                accessToken,
                refreshToken,
                message: "Logged in sucessfully",
            });
        } catch (err) {

            res.status(500).json({ error: true, message: "Internal Server Error" });
        }
    }
    async logout(req, res) {
        try {
            const userToken = UserToken.where("token", req.body.refreshToken);
            if (userToken.error)
                return res
                    .status(200)
                    .json({ error: false, message: "Logged Out Sucessfully" });
    
            UserToken.delete(userToken.id);
            res.status(200).json({ error: false, message: "Logged Out Sucessfully" });
        } catch (err) {
            res.status(500).json({ error: true, message: "Internal Server Error" });
        }
    }
    async refresh(req, res) {
        verifyRefreshToken(req.body.refreshToken)
            .then(({ tokenDetails }) => {
                const payload = { id: tokenDetails.id, role: tokenDetails.role};
                const accessToken = jwt.sign(
                    payload,
                    process.env.ACCESS_TOKEN_PRIVATE_KEY,
                    { expiresIn: "14m" }
                );
                res.status(200).json({
                    error: false,
                    accessToken,
                    message: "Access token created successfully",
                });
            })
            .catch((err) => res.status(400).json(err));
    }
    me(req, res) {
        const accessToken = (req.get("authorization")).replace(/Bearer /, "")
        verifyAccessToken(accessToken)
            .then(({tokenDetails}) => {
                const user = User.find(tokenDetails.id)
                if (user.error)
                    return res
                        .status(401)
                        .json({ error: true, message: "User not found" });
                
                res.status(200).json(user)
            })
            .catch((err) => res.status(400).json(err));
    }
}