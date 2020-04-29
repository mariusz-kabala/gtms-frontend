const database = require('./db/groups')

module.exports = {
  path: '/api/v1/groups/:slug',
  delay: 1500,
  method: 'POST',
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

    const record = database[params.slug] || database.owsiak

    return Object.keys(record).reduce((newRecord, field) => {
      newRecord[field] = body[field] || record[field]

      return newRecord
    }, {})
  },
}
