const asyncErrorWrapper = require('express-async-handler');
const User = require('../models/user/User');
const CustomError = require('../helpers/error/CustomError');
const {validateUserInput, comparePassword} = require('../helpers/input/inputHelper');
const { sendJwtToClient } = require('../helpers/authorization/tokenHelper');

const register = asyncErrorWrapper(async (req, res, next) => {

    const {name, email, password} = req.body;
    const user = await User.create({
        name,
        email,
        password
    });
   sendJwtToClient(user, res);

});

const getUser = (req, res, next) => {
    res.json({
        success: true,
        data: {
            id: req.user.id,
            name: req.user.name
        }
    });
};

const login = asyncErrorWrapper(async (req, res, next) => {
    const {email, password} = req.body;
    if(!validateUserInput) {
        return next(new CustomError('Please enter valid email and password.', 400));
    }

    const user = await User.findOne({email}).select('+password');

    if(!comparePassword(password, user.password)) {
        return next(new CustomError('Please check your password', 400));
    }
    sendJwtToClient(user, res);
});

const token = asyncErrorWrapper(async (req, res, next) => {
    return res
    .status(200)
    .json({
        success: true,
        name: req.user.name,
        token: req.token
    });
});

const logout = asyncErrorWrapper(async (req, res, next) => {
    const { NODE_ENV } = process.env;
    return res
    .status(200)
    .cookie('access_token', {
        httpOnly: true,
        expires: new Date(Date.now()),
        secure: NODE_ENV === 'development' ? false : true
    })
    .json({
        success: true,
        message: 'logout successfull'
    });
});

module.exports = { register, login, getUser, logout, token }