module.exports = {
  path: '/api/v1/auth/users',
  delay: 1000,
  method: 'POST',
  status: (req, res, next) => {
    if (req.body.email === 'test@geotags.pl') {
      res.status(400)
    } else {
      res.status(201)
    }

    next()
  },
  template: (_params, _query, body) => {
    if (body.email === 'test@geotags.pl') {
      return {
        email: {
          message:
            'Error, expected `email` to be unique. Value: `test@geotags.pl`',
          name: 'ValidatorError',
          properties: {
            message:
              'Error, expected `email` to be unique. Value: `test@geotags.pl`',
            type: 'unique',
            path: 'email',
            value: 'test@geotags.pl',
          },
          kind: 'unique',
          path: 'email',
          value: 'test@geotags.pl',
        },
      }
    }

    return {
      id: '5ce208055bf8fdcf85ee2d86',
      email: body.email,
      countryCode: body.countryCode || 'PL',
      languageCode: body.languageCode || 'pl-PL',
    }
  },
}
