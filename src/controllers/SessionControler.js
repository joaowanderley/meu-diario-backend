const connection = require('../database/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

module.exports = {
  async create(request, response) {
    const { email, password } = request.body;
    const user = await connection('users')
      .select('*')
      .where('email', email)
      .first()

    if (!user) {
      return response.status(401).send({ message: 'Authentication failed' })
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return response.status(401).send({ message: 'Authentication failed' })
      }
      if (result) {
        const token = jwt.sign({
          id_user: user.id,
          email: user.email,
        }, process.env.JWT_KEY, {
          expiresIn: '1h'
        })
        userResponse = {
          id: user.id,
          name: user.name,
        }
        return response.status(200).send({
          userResponse,
          access_token: token
        })
      }
      return response.status(401).send({ message: 'Authentication failed' })
    })
  }
}