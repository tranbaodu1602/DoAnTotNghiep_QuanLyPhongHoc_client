const userRouter = require('./UserRouter');
const hocPhanRouter = require('./HocPhanRouter');
const sinhVienRouter = require('./SinhVienRouter');

const routes = (app) => {
    app.use('/auth', userRouter);
    app.use('/course', hocPhanRouter);
    app.use('/student', sinhVienRouter);
};

module.exports = routes;
