import express from 'express'
import cors from 'cors'

express()
  .use(cors())
  .get('/api', (req, res) => res.send('hello, world'))
  .listen(8080);

