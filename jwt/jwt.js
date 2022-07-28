import jwt from "jsonwebtoken";

const TOKEN_EXPIRES_IN = "1h"

const generateAccessToken = (user) => jwt.sign(
    {
        userId: user._id,
        email: user.email,
        isLoggedIn: true,
    },
    process.env.SECRET,
    { expiresIn: TOKEN_EXPIRES_IN }
)

const verifyToken = (token, cb_error) => jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) cb_error(err)
})

export {
    generateAccessToken,
    verifyToken
}