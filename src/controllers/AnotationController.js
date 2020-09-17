const connection = require('../database/connection')
const crypto = require('crypto');

module.exports = {
  //lista todas anotações
  async index(request, response) {
    const { user_id } = request.headers;

    const findUser = await connection('users')
      .select('*')
      .where('id', user_id)
      .first()

    if (!findUser) {
      return response.status(404).send({ message: 'user not found' })
    } else {
      const user_anotations = await connection('anotations')
        .select('*')
        .where('user_id', findUser.id)
      if (user_anotations.length < 1) {
        return response.status(200).send({ message: 'No have anotations yet, add one now :)' })
      }
      return response.status(200).send(user_anotations)
    }

  },
  // listar uma anotação por UID
  async search(request, response) {
    const uid_anotation = request.params.uid
    const user_id = request.headers.user_id

    const anotation = await connection('anotations')
      .where({
        'uid': uid_anotation,
        'user_id': user_id
      })
      .select('*')
      .first()

    if (anotation) {
      return response.status(200).send(anotation)
    }
    return response.status(404).send({ message: 'not found' })
  },
  // deletar anotação
  async delete(request, response) {
    const uid_anotation = request.params.uid

    const anotation = await connection('anotations')
      .where('uid', uid_anotation)
      .select('user_id')
      .first()

    if (!anotation) {
      return response.status(404).send({ message: 'Anotation not found' })
    }

    await connection('anotations').where('uid', uid_anotation).delete();

    return response.status(204).send({ message: 'succesful' });
  },
  //editar anotação
  async update(request, response) {
    const user_id = request.headers.user_id
    const uid_anotation = request.params.uid
    const { text } = request.body

    const anotation = await connection('anotations')
      .where({ 'uid': uid_anotation, 'user_id': user_id })
      .first()
    if (!anotation) {
      return response.status(404).send({ message: 'Anotation not found' })
    }
    const anotationUpdate = await connection('anotations')
      .update({ text })
      .where({ 'uid': uid_anotation, 'user_id': user_id })

    return response.status(200).send({ ok: 'success' })
  },
  //cria uma nova anotação
  async create(request, response) {
    const { user_id } = request.headers;
    const { text } = request.body
    const id = crypto.randomBytes(4).toString('HEX');
    const uid = crypto.randomBytes(8).toString('HEX');

    if (!text) {
      return response.status(400).send({ error: 'No value passed in field Text'})
    }
    const anotation = await connection('anotations')
      .insert({
        id,
        uid,
        text,
        user_id
      })

    return response.status(200).send({ ok: 'success' })
  },
}