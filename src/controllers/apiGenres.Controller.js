const { getAllGenres } = require('../services/genres.services');

module.exports = {
  index: async (req, res) => {
    try {
        const { genres } = await getAllGenres();

        return res.status(200).json({
            ok: true,
            meta: {
                total: genres.length
            },
            data: genres
        })
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).json({
            ok: false,
            status: error.status || 500,
            error: error.message || 'Upss, hubo un error...'
        })
    }
},
  show: (req, res) => {
  
  },
  store: (req, res) => {
  
  },
  update: (req, res) => {
  
  },
  delete: (req, res) => {
  
  },
};
