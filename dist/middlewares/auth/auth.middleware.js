"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleUnauthorizedError = (next) => {
    const error = new Error('Login Error : Please try again');
    error.status = 401;
    return next(error);
};
const validateTokenMiddleware = (req, res, next) => {
    try {
        const authHeader = req.get('Authorization');
        console.log(authHeader);
    }
    catch (error) { }
};
