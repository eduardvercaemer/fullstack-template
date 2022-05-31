/**
 * Your backend code goes here in the ./server directory, and can be
 * referenced from the client via the `apiUrl` variable, this accounts
 * for development and production environments.
 */
import express from 'express'
import cors from 'cors'
import path from 'path'
import config from '../config'

const serveClient = config.serveClient

const publicPath = path.join(__dirname, '../../dist/client')

const port = config.apiPort

express()
  .use(cors())
  .use((req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
  })
  .use(serveClient ? express.static(publicPath) : (req, res, next) => next())
  .get('/api', (req, res) => res.send('hello, world'))
  .listen(port, () => console.log(`listening on port ${port}`))
