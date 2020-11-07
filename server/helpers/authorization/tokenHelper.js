const sendJwtToClient = (user, res) => {

    // user modeline gore jwt olusturma
    const token = user.generateJwtFromUser();

    const {JWT_COOKIE, NODE_ENV} = process.env;

    return res
    .status(200)
    .cookie('access_token', token, {
        httpOnly:false,
        expires: new Date(Date.now() + parseInt(JWT_COOKIE) * 1000 * 60),
        // secure: NODE_ENV === 'development' ? false : true
    })
    .json({
        success: true,
        access_token: token,
        data: {
            name: user.name,
            email: user.email
        },
        message: 'deneme'
    });
}

const isTokenIncluded = (req) => {
    if(req.headers.cookie){
        return true;
    } 
    return false;
};

const getAccessTokenFromHeader = (req) => {
    const authorization = req.headers.cookie;
    const access_token = authorization.split('=')[1];
    return access_token;
};


module.exports = { sendJwtToClient, isTokenIncluded, getAccessTokenFromHeader };

