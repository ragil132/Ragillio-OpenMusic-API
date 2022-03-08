const Joi = require('joi')

const routes = (handler) => [
  {
    method: 'POST',
    path: '/collaborations',
    options: {
      auth: 'songsapp_jwt',
      handler: handler.postCollaborationHandler,
      description: 'add collaboration to playlist',
      tags: ['api'],
      notes: ['add collaboration'],
      response: {
        status: {
          201: Joi.object({
            status: Joi.string().example('success'),
            message: Joi.string().example('Kolaborasi berhasil ditambahkan'),
            data: Joi.object({
              collaborationId: Joi.string().example('collab-Qbax5Oy7L8WKf74l')
            })
          }),
          400: Joi.object({
            status: Joi.string().example('fail'),
            message: Joi.string().example('Kolaborasi gagal ditambahkan')
          }),
          404: Joi.object({
            status: Joi.string().example('fail'),
            message: Joi.string().example('Playlist tidak ditemukan')
          }),
          403: Joi.object({
            status: Joi.string().example('fail'),
            message: Joi.string().example('Anda tidak berhak mengakses resource ini')
          })
        }
      },
      validate: {
        headers: Joi.object({
          authorization: Joi.string().description('Bearer Token').required()
        }).options({ allowUnknown: true }),
        payload: Joi.object({
          playlistId: Joi.string().example('playlist-Qbax5Oy7L8WKf74l'),
          userId: Joi.string().example('user-Qbax5Oy7L8WKf74l')
        })
      }
    },
  },
  {
    method: 'DELETE',
    path: '/collaborations',
    options: {
      auth: 'songsapp_jwt',
      handler: handler.deleteCollaborationHandler,
      description: 'delete collaborations',
      tags: ['api'],
      notes: ['remove collaborations'],
      response: {
        status: {
          200: Joi.object({
            status: Joi.string().example('success'),
            message: Joi.string().example('Kolaborasi berhasil dihapus')
          }),
          400: Joi.object({
            status: Joi.string().example('fail'),
            message: Joi.string().example('Kolaborasi gagal dihapus')
          }),
          404: Joi.object({
            status: Joi.string().example('fail'),
            message: Joi.string().example('Playlist tidak ditemukan')
          }),
          403: Joi.object({
            status: Joi.string().example('fail'),
            message: Joi.string().example('Anda tidak berhak mengakses resource ini')
          })
        }
      },
      validate: {
        headers: Joi.object({
          authorization: Joi.string().description('Bearer Token').required()
        }).options({ allowUnknown: true }),
        payload: Joi.object({
          playlistId: Joi.string().example('playlist-Qbax5Oy7L8WKf74l'),
          userId: Joi.string().example('user-Qbax5Oy7L8WKf74l')
        })
      }
    },
  },
];

module.exports = routes;
