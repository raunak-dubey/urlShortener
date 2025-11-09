import { loginUserService, registerUserService } from "../services/auth.service.js";
import catchAsync from "../utils/catchAsync.utils.js";
import { cookieOptions } from "../config/config.js";

export const registerUser = catchAsync(async (req, res) => {
    const {name, email, password} = req.body;
    const {token, user} = await registerUserService(name, email, password);
    req.user = user;
    res.cookie('accessToken', token, cookieOptions);
    res.status(201).json({user, message: 'User registered successfully'});
});

export const loginUser = catchAsync(async (req, res) => {
    const {email, password} = req.body;
    const {token, user} = await loginUserService(email, password);
    req.user = user;
    res.cookie('accessToken', token, cookieOptions);
    res.status(200).json({user, message: 'User logged in successfully'});
});

export const logoutUser = catchAsync(async (req, res) => {
    // Logout logic here
    res.status(200).json({user, message: 'User logged out successfully' });
});

export const getUser = catchAsync(async (req, res) => {
    res.status(200).json({user: req.user})
})