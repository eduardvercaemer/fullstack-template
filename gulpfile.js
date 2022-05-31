const { Parcel } = require('@parcel/core')
const path = require('path')
const gulp = require('gulp')
const nodemon = require('gulp-nodemon')

const commonConfig = {
  defaultConfig: '@parcel/config-default',
  additionalReporters: [
    {
      packageName: '@parcel/reporter-cli',
      resolveFrom: path.resolve(__dirname, 'node_modules'),
    },
  ],
}

const clientConfig = mode => ({
  entries: 'src/client/index.html',
  defaultTargetOptions: {
    distDir: 'dist/client',
  },
  env: {
    NODE_ENV: mode,
  },
})

const serverConfig = {
  entries: 'src/server/main.js',
  targets: ['node'],
  defaultTargetOptions: {
    distDir: 'dist/server',
  },
}

const clientBundler = new Parcel({
  ...commonConfig,
  ...clientConfig('production'),
})

const clientServer = new Parcel({
  ...commonConfig,
  ...clientConfig('development'),
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

function watchClient() {
  return clientServer.watch()
}

function buildClient() {
  return clientBundler.run()
}

function watchServer() {
  return serverBundler.watch()
}

function buildServer() {
  return serverBundler.run()
}

function serverMon(done) {
  const stream = nodemon({
    script: 'dist/server/main',
    quiet: true,
    done,
  })

  stream
    .on('restart', function () {
      console.log('server restarted...')
    })
    .on('crash', function () {
      console.error('application has crashed...')
      stream.emit('restart', 10)
    })
}

exports.dev = gulp.parallel(watchClient, watchServer, serverMon)

exports.build = gulp.parallel(buildClient, buildServer)
