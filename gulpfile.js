const { Parcel } = require('@parcel/core')
const path = require('path')
const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
const devConfig = require('./src/config/development')
const prodConfig = require('./src/config/production')

const commonConfig = config => ({
  defaultConfig: '@parcel/config-default',
  additionalReporters: [
    {
      packageName: '@parcel/reporter-cli',
      resolveFrom: path.resolve(__dirname, 'node_modules'),
    },
  ],
  mode: config.mode,
})

const clientConfig = config => ({
  entries: 'src/client/index.html',
  defaultTargetOptions: {
    distDir: 'dist/client',
  },
  env: {
    NODE_ENV: config.mode,
  },
})

const serverConfig = config => ({
  entries: 'src/server/main.js',
  targets: ['node'],
  defaultTargetOptions: {
    distDir: 'dist/server',
  },
})

const clientBundler = config =>
  new Parcel({
    ...commonConfig(config),
    ...clientConfig(config),
    serveOptions: config.clientPort
      ? {
          port: config.clientPort,
        }
      : undefined,
    hmrOptions: config.clientPort
      ? {
          port: config.clientPort,
        }
      : undefined,
  })

const serverBundler = config =>
  new Parcel({
    ...commonConfig(config),
    ...serverConfig(config),
  })

const watchClient = config => () => clientBundler(config).watch()

const buildClient = config => () => clientBundler(config).run()

const watchServer = config => () => serverBundler(config).watch()

const buildServer = config => () => serverBundler(config).run()

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

exports.dev = gulp.parallel(
  watchClient(devConfig),
  watchServer(devConfig),
  serverMon
)

exports.build = gulp.parallel(buildClient(prodConfig), buildServer(prodConfig))
