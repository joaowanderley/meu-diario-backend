const connection = require('../database/connection');
const crypto = require('crypto')
const bcrypt = require('bcrypt');

module.exports = {
  async create(request, response) {
    const { name, email } = request.body;
    // await connection('users').where
    const id = crypto.randomBytes(4).toString('HEX');
    bcrypt.hash(request.body.password, 10, async (err, hash) => {
      try {
        await connection('users')
          .insert({
            id,
            name,
            email,
            password: hash
          })
        return response.status(201).send({
          message: 'User created succesful',
          email: email
        })
      } catch (err) {
        return response.status(400).send({ err })
      }
    })
  }
}