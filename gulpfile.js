const { Parcel } = require('@parcel/core')
const path = require('path')
const gulp = require('gulp')
const nodemon = require('gulp-nodemon')

const commonConfig = {
  defaultConfig: '@parcel/config-default',
  additionalReporters: [
    {
      packageName: '@parcel/reporter-cli',
      resolveFrom: path.resolve(__dirname, 'node_modules')
    }
  ],
}

const clientConfig = {
  entries: 'src/client/index.html',
  defaultTargetOptions: {
    distDir: 'dist/client',
  }
}

const serverConfig = {
  entries: 'src/server/main.js',
  targets: [ 'node' ],
  defaultTargetOptions: {
    distDir: 'dist/server',
  },
}

const clientBundler = new Parcel({
  ...commonConfig,
  ...clientConfig,
  serveOptions: {
    port: 3000,
  },
  hmrOptions: {
    port: 3000,
  },
})

const serverBundler = new Parcel({
  ...commonConfig,
  ...serverConfig,
})

async function serveClient() {
  return await clientBundler.watch()
}

async function watchServer() {
  return await serverBundler.watch()
}

function serverMon(done) {
  const stream = nodemon({
    script: 'dist/server/main',
    quiet: true,
    done,
  })
  
  stream
    .on('restart', function() {
      console.log('server restarted...')
    })
    .on('crash', function() {
      console.error('application has crashed...')
      stream.emit('restart', 10)
    })
}

exports.serveClient = serveClient

exports.watchServer = watchServer

exports.serverMon = serverMon

exports.dev = gulp.parallel(serveClient, watchServer, serverMon)
