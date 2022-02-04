
const userRouter = require('./api/users');

module.exports = (app) => {
    app.use('/api/user', userRouter);
}