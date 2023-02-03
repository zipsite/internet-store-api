const verifyAccessToken = require("../../utils/verifyAccessToken.js")
module.exports = auth = (req, res, next) => {
    if (req.get("authorization")) {
        const accessToken = (req.get("authorization")).replace(/Bearer /, "")
        verifyAccessToken(accessToken)
        .then(({tokenDetails}) => {
            req.authData = tokenDetails;
            next();
        })
        .catch((err) => res.status(400).json(err));
    }
    else {
        res.status(403).json({
            error: true,
            message: "Unauthorized"
        })
    } 
}