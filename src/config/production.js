/**
 * This are production specific settings, be sure to update the apiUrl
 * to whatever is appropriate for your environment.
 */
exports.apiPort = process.env.PORT

exports.apiUrl = `https://example.com/api/v1`

exports.serveClient = true

exports.mode = 'production'
