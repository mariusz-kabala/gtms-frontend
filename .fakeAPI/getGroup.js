const database = require('./db/groups')

module.exports = {
  path: '/api/v1/groups/:slug',
  delay: 1500,
  method: 'GET',
  status: (req, res, next) => {
    if (['woodstock', 'brudstock'].includes(req.params.slug)) {
      res.status(404)
    }

    next()
  },
  template: (params, _query, body) => {
    if (['woodstock', 'brudstock'].includes(params.slug)) {
      return
    }

    return database[params.slug] || database.owsiak
  },
}
