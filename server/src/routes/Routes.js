const userRouter = require('./UserRouter');
const hocPhanRouter = require('./HocPhanRouter');
const sinhVienRouter = require('./SinhVienRouter');
const giaoVienRouter = require('./GiaoVienRouter');

const routes = (app) => {
    app.use('/auth', userRouter);
    app.use('/course', hocPhanRouter);
    app.use('/student', sinhVienRouter);
    app.use('/teacher', giaoVienRouter);
};

module.exports = routes;
