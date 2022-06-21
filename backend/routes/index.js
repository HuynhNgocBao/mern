const goalRouter = require('./goal');
const authRouter = require('./auth');
const userRouter = require('./user');

function route(app){
    app.use('/api/goals',goalRouter);
    app.use('/api/auth', authRouter);
    app.use('/api/users',userRouter);
}

module.exports = route;