const jwt = require('jsonwebtoken')

let JWT
let refreshJWT

module.exports = {
  path: '/v1/auth/facebook',
  delay: 5000,
  method: 'POST',
  status: (req, res, next) => {
    JWT = jwt.sign(
      {
        countryCode: 'PL',
        email: req.body.email,
        id: '5cdfb6a6bad88bb5dbf1eccf',
        languageCode: 'pl-PL',
        roles: [],
      },
      'fake-key',
      {
        expiresIn: 900,
      }
    )

    refreshJWT = jwt.sign(
      {
        countryCode: 'PL',
        email: req.body.email,
        id: '5cdfb6a6bad88bb5dbf1eccf',
        languageCode: 'pl-PL',
        roles: [],
      },
      'fake-key-refresh',
      {
        expiresIn: 86400,
      }
    )

    res.status(200)
    res.cookie('accessToken', JWT, { expires: new Date(Date.now() + 900000) })

    res.cookie('refreshToken', refreshJWT, {
      expires: new Date(Date.now() + 86400000),
    })

    next()
  },
  template: () => {
    return {
      accessToken: JWT,
      refreshToken: refreshJWT,
      newUser: true,
    }
  },
}
