fullstack-template
------------------

Simple fullstack template for web site/application.

## Technologies

- react 18 is setup for UI
- storybooks is setup for component development
- express js is setup for a server side API
- parcel is used for bundling / transpiling / dev

See the initial code in `./src/client` and `./src/server`
for pointers.

## Config

Configuration lives in `./src/config` and is easily setup
for development and production environments. For example,
we can fetch localhost for API calls during development,
and the real server in production

Make sure `NODE_ENV` is set to `production` in your server.
