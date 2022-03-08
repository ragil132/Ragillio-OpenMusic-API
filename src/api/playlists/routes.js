const Joi = require('joi')

const routes = (handler) => [
  {
    method: 'POST',
    path: '/playlists',
    options: {
      auth: 'songsapp_jwt',
      handler: handler.postPlaylistHandler,
      description: 'add playlist',
      tags: ['api'],
      notes: ['add playlist'],
      response: {
        status: {
          201: Joi.object({
            status: Joi.string().example('success'),
            message: Joi.string().example('Playlist berhasil ditambahkan'),
            data: Joi.object({
              playlistId: Joi.string().example('playlist-9U_Viy_DSI_5037j')
            })
          }),
          400: Joi.object({
            status: Joi.string().example('fail'),
            message: Joi.string().example('Playlist gagal ditambahkan')
          })
        }
      },
      validate: {
        headers: Joi.object({
          authorization: Joi.string().description('Bearer Token').required()
        }).options({ allowUnknown: true }),
        payload: Joi.object({
          name: Joi.string().example('playlist-name')
        })
      }
    },
  },
  {
    method: 'GET',
    path: '/playlists',
    options: {
      auth: 'songsapp_jwt',
      handler: handler.getPlaylistsHandler,
      description: 'Get Users Playlists',
      tags: ['api'],
      notes: ['Get Users Playlists'],
      response: {
        status: {
          200: Joi.object({
            status: Joi.string().example('success'),
            data: Joi.object({
              playlists: Joi.array()
                .items({
                  id: Joi.string().example('playlist-Qbax5Oy7L8WKf74l'),
                  name: Joi.string().example('Lagu anak-anak'),
                  username: Joi.string().example('ragillio')
                })
            })
          })
        }
      },
      validate: {
        headers: Joi.object({
          authorization: Joi.string().description('Bearer Token').required()
        }).options({ allowUnknown: true })
      }
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{playlistId}',
    options: {
      auth: 'songsapp_jwt',
      handler: handler.deletePlaylistByIdHandler,
      description: 'Delete user playlist',
      tags: ['api'],
      notes: ['Delete user playlist'],
      response: {
        status: {
          200: Joi.object({
            status: Joi.string().example('success'),
            message: Joi.string().example('Playlist berhasil dihapus')
          }),
          403: Joi.object({
            status: Joi.string().example('fail'),
            message: Joi.string().example('Anda tidak berhak mengakses resource ini')
          }),
          404: Joi.object({
            status: Joi.string().example('fail'),
            message: Joi.string().example('Playlist gagal dihapus. Id tidak ditemukan')
          })
        }
      },
      validate: {
        headers: Joi.object({
          authorization: Joi.string().description('Bearer Token').required()
        }).options({ allowUnknown: true }),
        params: Joi.object({
          playlistId: Joi.string().example('playlist-Qbax5Oy7L8WKf74l')
        })
      }
    },
  },
  {
    method: 'POST',
    path: '/playlists/{playlistId}/songs',
    options: {
      auth: 'songsapp_jwt',
      handler: handler.postPlaylistSongHandler,
      description: 'Add song to users playlist',
      tags: ['api'],
      notes: ['Add song to users playlist'],
      response: {
        status: {
          201: Joi.object({
            status: Joi.string().example('success'),
            message: Joi.string().example('Lagu berhasil ditambahkan ke playlist')
          }),
          400: Joi.object({
            status: Joi.string().example('fail'),
            message: Joi.string().example('songId must be a string')
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
        params: Joi.object({
          playlistId: Joi.string().example('playlist-Qbax5Oy7L8WKf74l')
        }),
        payload: Joi.object({
          songId: Joi.string().example('song-Qbax5Oy7L8WKf74l')
        })
      }
    },
  },
  {
    method: 'GET',
    path: '/playlists/{playlistId}/songs',
    options: {
      auth: 'songsapp_jwt',
      handler: handler.getPlaylistSongsHandler,
      description: 'Get song in playlist',
      tags: ['api'],
      notes: ['Get song in playlist'],
      response: {
        status: {
          200: Joi.object({
            status: Joi.string().example('success'),
            data: Joi.object({
              songs: Joi.array()
                .items({
                  id: Joi.string().example('playlistSong-Qbax5Oy7L8WKf74l'),
                  title: Joi.string().example('Love Yourself'),
                  performer: Joi.string().example('Justin Bieber')
                })
            })
          }),
          400: Joi.object({
            status: Joi.string().example('fail'),
            message: Joi.string().example('Kolaborasi gagal diverifikasi')
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
        params: Joi.object({
          playlistId: Joi.string().example('playlist-Qbax5Oy7L8WKf74l')
        })
      }
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{playlistId}/songs',
    options: {
      auth: 'songsapp_jwt',
      handler: handler.deletePlaylistSongByIdHandler,
      description: 'Delete song in playlist',
      tags: ['api'],
      notes: ['Delete song in playlist'],
      response: {
        status: {
          200: Joi.object({
            status: Joi.string().example('success'),
            message: Joi.string().example('Lagu berhasil dihapus dari playlist')
          }),
          400: Joi.object({
            status: Joi.string().example('fail'),
            message: Joi.string().example('Lagu gagal dihapus')
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
        params: Joi.object({
          playlistId: Joi.string().example('playlist-Qbax5Oy7L8WKf74l')
        }),
        payload: Joi.object({
          songId: Joi.string().example('song-Qbax5Oy7L8WKf74l')
        })
      }
    },
  },
];

module.exports = routes;
