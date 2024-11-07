window.htmx = require('htmx.org').default

window.htmx.config.selfRequestsOnly = false

if (process.env.NODE_ENV === 'production') {
  window.htmx.logNone()
} else {
  window.htmx.logAll()
}
