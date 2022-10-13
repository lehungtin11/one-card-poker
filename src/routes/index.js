const cardRouter = require('./card')

function route (app) {
    app.use('/', cardRouter)
}

module.exports = route