const goalRouter = require('./goal')

function route(app){
    app.use('/api/goals',goalRouter);
}

module.exports = route;