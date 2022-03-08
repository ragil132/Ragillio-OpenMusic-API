const Joi = require('joi')

const routes = (handler) => [
  {
    method: 'POST',
    path: '/authentications',
    options: {
      handler: handler.postAuthenticationHandler,
      description: 'Add authentication if not exist',
      tags: ['api'],
      notes: ['Auth is needed for accessing playlists, etc.'],
      response: {
        status: {
          201: Joi.object({
            status: Joi.string().example('success'),
            message: Joi.string().example('Authentication berhasil ditambahkan'),
            data: Joi.object({
              accessToken: Joi.string().example('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.2BuYdbtIHYp23D62hoZhh6gbRuh5iCR_zCL8rKlVjM4'),
              refreshToken: Joi.string().example('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.2BuYdbtIHYp23D62hoZhh6gbRuh5iCR_zCL8rKlVjM4')
            })
          }),
          400: Joi.object({
            status: Joi.string().example('fail'),
            message: Joi.string().example('username must be a string')
          }),
          401: Joi.object({
            status: Joi.string().example('fail'),
            message: Joi.string().example('Kredensial yang Anda berikan salah')
          })
        }
      },
      validate: {
        payload: Joi.object({
          username: Joi.string().example('John Doe'),
          password: Joi.string().example('12345678')
        })
      }
    }
  },
  {
    method: 'PUT',
    path: '/authentications',
    options: {
      handler: handler.putAuthenticationHandler,
      description: 'Update auth',
      tags: ['api'],
      notes: ['If accessToken is expired, update auth is needed'],
      response: {
        status: {
          200: Joi.object({
            status: Joi.string().example('success'),
            message: Joi.string().example('Authentication berhasil diperbarui'),
            data: Joi.object({
              accessToken: Joi.string().example('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.2BuYdbtIHYp23D62hoZhh6gbRuh5iCR_zCL8rKlVjM4')
            })
          }),
          400: Joi.object({
            status: Joi.string().example('fail'),
            message: Joi.string().example('Refresh token tidak valid')
          })
        }
      },
      validate: {
        payload: Joi.object({
          refreshToken: Joi.string().example('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.2BuYdbtIHYp23D62hoZhh6gbRuh5iCR_zCL8rKlVjM4')
        })
      }
    }
  },
  {
    method: 'DELETE',
    path: '/authentications',
    options: {
      handler: handler.deleteAuthenticationHandler,
      description: 'Delete Auth (logout)',
      tags: ['api'],
      notes: ['When logout, auth will deleted'],
      response: {
        status: {
          200: Joi.object({
            status: Joi.string().example('success'),
            message: Joi.string().example('Refresh token berhasil dihapus')
          }),
          400: Joi.object({
            status: Joi.string().example('fail'),
            message: Joi.string().example('Refresh token tidak valid')
          })
        }
      },
      validate: {
        payload: Joi.object({
          refreshToken: Joi.string().example('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.2BuYdbtIHYp23D62hoZhh6gbRuh5iCR_zCL8rKlVjM4')
        })
      }
    }
  },
];

module.exports = routes;
