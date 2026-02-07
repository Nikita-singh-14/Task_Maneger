const routeNotFound = (req, res, next) => {
    const error = new Error(`Route not found: ${req.orihinalUrl}`);
    res.status(404);
    next(error);
}

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statuCode === 200 ? 500 :res.statusCode;
    let message = err.message;

    if(err.name === "CastError" && err.kind === "ObjectId"){
        statusCode = 404
        message = "Request not found";
    }
    res.status(statusCode).json({
        message:message,
        stack: process.env.NODE_ENV !== "production" ? null : err.stack,
    });
}

export {routeNotFound, errorHandler};