import express from 'express'
import cors from 'cors'
import path from 'path'
import config from '../config'

const serveClient = config.serveClient

const port = config.apiPort

express()
  .use(cors())
  .use((req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
  })
  .use(
    serveClient
      ? express.static(path.resolve(__dirname, '../../dist/client'))
      : (req, res, next) => next()
  )
  .get('/api', (req, res) => res.send('hello, world'))
  .listen(port, () => console.log(`listening on port ${port}`))
