const userRouter = require('./UserRouter');

const routes = (app) => {
    app.use('/auth', userRouter);
};

module.exports = routes;
