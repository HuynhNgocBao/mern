const goalRouter = require('./goal');
const userRouter = require('./user');

function route(app){
    app.use('/api/goals',goalRouter);
    app.use('/api/users', userRouter);
}

module.exports = route;