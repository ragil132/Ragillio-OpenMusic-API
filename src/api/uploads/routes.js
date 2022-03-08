const path = require('path');
const Joi = require('joi');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/upload/pictures',
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
        maxBytes: 500000,
      },
      handler: handler.postUploadPictureHandler,
      plugins: {
        'hapi-swagger': {
          payloadType: 'form'
        }
      },
      description: 'Upload picture',
      tags: ['api'],
      notes: ['Upload picture'],
      response: {
        status: {
          201: Joi.object({
            status: Joi.string().example('success'),
            message: Joi.string().example('Gambar berhasil diunggah'),
            data: Joi.object({
              pictureUrl: Joi.string().example(`https://${process.env.HOST}:${process.env.PORT}/upload/pictures/yourfilename`)
            })
          }),
          400: Joi.object({
            status: Joi.string().example('fail'),
            message: Joi.string().example('Please upload a valid picture')
          })
        }
      },
      validate: {
        payload: Joi.object({
          data: Joi.any()
            .meta({ swaggerType: 'file' })
            .description('photo file')
        })
      }
    },
  },
  {
    method: 'GET',
    path: '/upload/{param*}',
    handler: {
      directory: {
        path: path.resolve(__dirname, 'file'),
      },
    }
  },
];

module.exports = routes;
