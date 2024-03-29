// server.js
const next = require('next')
const routes = require('./routes')
const app = next({dev: process.env.NODE_ENV !== 'production'})
const handler = routes.getRequestHandler(app)


// Without express
const {createServer} = require('http')
app.prepare().then(() => {
  createServer(handler).listen(3000)
  console.log('Ready on loalhost:3000')
})