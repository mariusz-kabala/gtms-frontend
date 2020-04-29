const database = {
  owsiak: {
    id: '1ERTdo8K9tthIBE11Vxgcm9P9MK17qbnBiSPbAV4vJaphwN5cz',
    name: 'Owsiak',
    slug: 'owsiak',
    description: 'lorem ipsum 1234',
    type: 'public',
    visibility: 'public',
    tags: ['owsiak', 'sprzedaje', 'uran', 'czeczenom'],
    members: [],
    owner: '5cdfb6a6bad88bb5dbf1eccf',
  },
  'private-group': {
    id: '1ERTdo8K9tthIBE11Vxgcm9P9MK17qbnBiSPbAV4vJaphwN5cz',
    name: 'Private group',
    slug: 'private-group',
    description:
      'lorem ipsum 1234\n\n we should support\n markdown in description\n # header test',
    type: 'private',
    visibility: 'private',
    tags: [],
    members: [],
    owner: 'fake-id-you-can-not-have-it',
  },
  'my-private-group': {
    id: '1ERTdo8K9tthIBE11Vxgcm9P9MK17qbnBiSPbAV4vJaphwN5cz',
    name: 'My Private group',
    slug: 'my-private-group',
    description:
      'this is my group, its private, but I should be able to access it!!!\n\n we should support\n markdown in description\n # header test',
    type: 'private',
    visibility: 'private',
    tags: [],
    members: [],
    owner: '5cdfb6a6bad88bb5dbf1eccf',
  },
}

module.exports = {
  path: '/api/v1/groups/:slug',
  delay: 500,
  method: 'GET',
  status: (req, res, next) => {
    if (['woodstock', 'brudstock'].includes(req.params.slug)) {
      res.status(404)
    }

    next()
  },
  template: (_params, _query, body) => {
    if (['woodstock', 'brudstock'].includes(req.params.slug)) {
      return
    }

    return database[req.params.slug] || database.owsiak
  },
}
