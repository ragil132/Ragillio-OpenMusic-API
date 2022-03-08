const Joi = require('joi')

const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    options: {
      handler: handler.postUserHandler,
      description: 'Add user',
      tags: ['api'],
      notes: ['Add user'],
      response: {
        status: {
          201: Joi.object({
            status: Joi.string().example('success'),
            message: Joi.string().example('User berhasil ditambahkan'),
            data: Joi.object({
              userId: Joi.string().example('user-Uakgb_J5m9g')
            })
          }),
          400: Joi.object({
            status: Joi.string().example('fail'),
            message: Joi.string().example('User gagal ditambahkan')
          })
        }
      },
      validate: {
        payload: Joi.object({
          username: Joi.string().max(50).example('jokowi').required(),
          password: Joi.string().example('3_periode').required(),
          fullname: Joi.string().example('Anies Baswedan').required(),
        })
      }
    }
  },
  {
    method: 'GET',
    path: '/users/{id}',
    options: {
      handler: handler.getUserByIdHandler,
      description: 'Get user details',
      tags: ['api'],
      notes: ['Get user details'],
      response: {
        status: {
          200: Joi.object({
            status: Joi.string().example('success'),
            data: Joi.object({
              user: Joi.object({
                id: Joi.string().example('user-Uakgb_J5m9g'),
                username: Joi.string().example('rangga'),
                fullname: Joi.string().example('Lord Rangga')
              })
            })
          }),
          404: Joi.object({
            status: Joi.string().example('fail'),
            message: Joi.string().example('User tidak ditemukan')
          })
        }
      },
      validate: {
        params: Joi.object({
          id: Joi.string().example('user-Uakgb_J5m9g')
        })
      }
    }
  },
  {
    method: 'GET',
    path: '/users',
    options: {
      handler: handler.getUsersByUsernameHandler,
      description: 'Get list of users',
      tags: ['api'],
      notes: ['Get list of users'],
      response: {
        status: {
          200: Joi.object({
            status: Joi.string().example('success'),
            data: Joi.object({
              users: Joi.array()
                .items({
                  id: Joi.string().example('user-Uakgb_J5m9g'),
                  username: Joi.string().example('lisa_blackpink'),
                  fullname: Joi.string().example('Lalisa Manoban')
                })
            })
          })
        }
      },
      validate: {
        query: Joi.object({
          username: Joi.string().example('juragan99')
        })
      }
    }
  },
];

module.exports = routes;
