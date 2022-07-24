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

export {
    generateAccessToken,
}