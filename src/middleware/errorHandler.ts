import express from 'express';

const app = express();

//ERROR HANDLER MIDDLEWARE
app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    const errorMessage = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: errorMessage,
        stack: err.stack
    })
});

