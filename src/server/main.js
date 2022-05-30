import express from 'express'

express()
  .get('/', (req, res) => res.send('hello, world'))
  .listen(8080);

