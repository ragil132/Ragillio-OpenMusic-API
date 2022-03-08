const Joi = require('joi')

const routes = (handler) => [
  {
    method: 'POST',
    path: '/songs',
    options: {
      handler: handler.postSongHandler,
      description: 'Add song',
      tags: ['api'],
      notes: ['Add song'],
      response: {
        status: {
          201: Joi.object({
            status: Joi.string().example('success'),
            message: Joi.string().example('Lagu berhasil ditambahkan'),
            data: Joi.object({
              songId: Joi.string().example('song-Uakgb_J5m9g-0JDMbcJqL')
            })
          }),
          400: Joi.object({
            status: Joi.string().example('fail'),
            message: Joi.string().example('Lagu gagal ditambahkan')
          })
        }
      },
      validate: {
        payload: Joi.object({
          title: Joi.string().example('Satru').required(),
          year: Joi.number().integer().min(1500).max(new Date().getUTCFullYear()).example(2020)
            .required(),
          performer: Joi.string().example('Mozart').required(),
          genre: Joi.string().example('Dangdut'),
          duration: Joi.number().example(240),
        })
      }
    }
  },
  {
    method: 'GET',
    path: '/songs',
    options: {
      handler: handler.getSongsHandler,
      description: 'Get song data',
      tags: ['api'],
      notes: ['Get song data'],
      response: {
        status: {
          200: Joi.object({
            status: Joi.string().example('success'),
            data: Joi.object({
              songs: Joi.array()
                .items({
                  id: Joi.string().example('song-Qbax5Oy7L8WKf74l'),
                  title: Joi.string().example('Dear God'),
                  performer: Joi.string().example('Avenged Sevenfold')
                })
            })
          })
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/songs/{songId}',
    options: {
      handler: handler.getSongByIdHandler,
      description: 'Get song details',
      tags: ['api'],
      notes: ['Get song details'],
      response: {
        status: {
          200: Joi.object({
            status: Joi.string().example('success'),
            data: Joi.object({
              song: Joi.object({
                id: Joi.string().example('song-Qbax5Oy7L8WKf74l'),
                title: Joi.string().example('To the Bone'),
                year: Joi.number().integer().min(1500).max(2100).example(2020),
                performer: Joi.string().example('Pamungkas'),
                genre: Joi.string().example('Pop'),
                duration: Joi.number().example(360),
                insertedAt: Joi.string().example('2022-03-07T14:43:51.449Z'),
                updatedAt: Joi.string().example('2022-03-07T14:43:51.449Z')
              })
            })
          }),
          404: Joi.object({
            status: Joi.string().example('success'),
            message: Joi.string().example('Lagu tidak ditemukan')
          })
        }
      },
      validate: {
        params: Joi.object({
          songId: Joi.string().example('song-Qbax5Oy7L8WKf74l')
        })
      }
    }
  },
  {
    method: 'PUT',
    path: '/songs/{songId}',
    options: {
      handler: handler.putSongByIdHandler,
      description: 'Update song data',
      tags: ['api'],
      notes: ['Update song data'],
      response: {
        status: {
          200: Joi.object({
            status: Joi.string().example('success'),
            message: Joi.string().example('Lagu berhasil diperbarui')
          }),
          400: Joi.object({
            status: Joi.string().example('fail'),
            message: Joi.string().example('Bad Request')
          }),
          404: Joi.object({
            status: Joi.string().example('fail'),
            message: Joi.string().example('Gagal memperbarui lagu. Id tidak ditemukan')
          })
        }
      },
      validate: {
        params: Joi.object({
          songId: Joi.string().example('song-Qbax5Oy7L8WKf74l')
        }),
        payload: Joi.object({
          title: Joi.string().example('Satru').required(),
          year: Joi.number().integer().min(1500).max(new Date().getUTCFullYear()).example(2020)
            .required(),
          performer: Joi.string().example('Mozart').required(),
          genre: Joi.string().example('Dangdut'),
          duration: Joi.number().example(240),
        })
      }
    }
  },
  {
    method: 'DELETE',
    path: '/songs/{songId}',
    options: {
      handler: handler.deleteSongByIdHandler,
      description: 'Delete song',
      tags: ['api'],
      notes: ['Delete song'],
      response: {
        status: {
          200: Joi.object({
            status: Joi.string().example('success'),
            message: Joi.string().example('Lagu berhasil dihapus')
          }),
          404: Joi.object({
            status: Joi.string().example('fail'),
            message: Joi.string().example('Lagu gagal dihapus. Id tidak ditemukan')
          })
        }
      },
      validate: {
        params: Joi.object({
          songId: Joi.string().example('song-Qbax5Oy7L8WKf74l')
        })
      }
    }
  },
];

module.exports = routes;
