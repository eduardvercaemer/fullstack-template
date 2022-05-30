import express from 'express'
import cors from 'cors'
import config from '../config'

const serveClient = config.serveClient

const port = config.apiPort

express()
  .use(cors())
  .get('/api', (req, res) => res.send('hello, world'))
  .listen(port, () => console.log(`listening on port ${port}`))
