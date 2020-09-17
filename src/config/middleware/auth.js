const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers
    const { user_id } = req.headers

    if (authorization) {
      const token = authorization.split(' ')[1]
      const decode = jwt.verify(token, process.env.JWT_KEY)
      req.user = decode

      if (decode.id_user !== user_id) {
        return res.status(401).send({ error: 'not authorized' })
      }
    } else {
      return res.status(401).send({ error: 'token not provided' })

    }
    next();
  } catch (error) {
    return res.status(401).send({ error: error.message })
  }
}