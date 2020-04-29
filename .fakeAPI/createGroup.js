const slugify = require('@sindresorhus/slugify')

const usedNames = ['owsiak', 'woodstock', 'brudstock', 'ryszard', 'petru']

module.exports = {
  path: '/api/v1/groups',
  delay: 500,
  method: 'POST',
  status: (req, res, next) => {
    if (usedNames.includes(req.body.name)) {
      res.status(400)
    }

    next()
  },
  template: (_params, _query, body) => {
    if (usedNames.includes(body.name)) {
      return {
        name: {
          message: `Error, expected 'name' to be unique. Value: '${body.name}'`,
          name: 'ValidatorError',
          properties: {
            message: `Error, expected 'name' to be unique. Value: '${body.name}'`,
            type: 'unique',
            path: 'name',
            value: body.name,
          },
          kind: 'unique',
          path: 'name',
          value: body.name,
        },
      }
    }

    return {
      id: '4ERTdo8K9tthIBE11Vxgcm9P9MK17qbnBiSPbAV4vJaphwN5cz',
      name: body.name,
      slug: slugify(body.name),
      type: body.type,
      visibility: body.visibility,
      owner: '5cdfb6a6bad88bb5dbf1eccf',
    }
  },
}
