const Joi = require('joi')

const routes = (handler) => [
  {
    method: 'POST',
    path: '/exports/playlists/{playlistId}',
    options: {
      auth: 'songsapp_jwt',
      handler: handler.postExportPlaylistsHandler,
      description: 'export data playlist',
      tags: ['api'],
      notes: ['send playlist to your email. if you use gmail, please turn off less secure app option, since Google did not trust this app.'],
      response: {
        status: {
          201: Joi.object({
            status: Joi.string().example('success'),
            message: Joi.string().example('Permintaan Anda sedang kami proses')
          }),
          400: Joi.object({
            status: Joi.string().example('fail'),
            message: Joi.string().example('Bad Request')
          }),
          403: Joi.object({
            status: Joi.string().example('fail'),
            message: Joi.string().example('Anda tidak berhak mengakses resource ini')
          }),
          404: Joi.object({
            status: Joi.string().example('fail'),
            message: Joi.string().example('Playlist tidak ditemukan')
          })
        }
      },
      validate: {
        headers: Joi.object({
          authorization: Joi.string().description('Bearer Token').required()
        }).options({ allowUnknown: true }),
        payload: Joi.object({
          targetEmail: Joi.string().example('user@gmail.com')
        }),
        params: Joi.object({
          playlistId: Joi.string().example('Uakgb_J5m9g-0JDMbcJqL')
        })
      }
    },
  },
];

module.exports = routes;
