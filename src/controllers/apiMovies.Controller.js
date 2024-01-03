const paginate = require('express-paginate');
const createError = require('http-errors');
const { getAllMovies, getMovieById, storeMovie, updateMovie, deleteMovie } = require("../services/movies.services")

module.exports = {

    index: async (req, res) => {

        const { keyword } = req.query

        try {
            const { count, movies } = await getAllMovies(req.query.limit, req.skip, keyword);
            const pagesCount = Math.ceil(count / req.query.limit);
            const currentPage = req.query.page;
            const pages = paginate.getArrayPages(req)(pagesCount, pagesCount, currentPage)

            return res.status(200).json({
                ok: true,
                meta: {
                    pagesCount,
                    currentPage,
                    pages
                },
                data: movies
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
    show: async (req, res) => {
        try {
            const movies = await getMovieById(req.params.id)
            return res.status(200).json({
                ok: true,
                data: movies
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
    store: async (req, res) => {
        try {
            const { title, rating, release_date, awards, length, genre_id, actors } = req.body

            if ([title, rating, release_date, awards].includes('' || undefined)) {
                throw createError(400, 'Todos los campos son obligatorios')
            }

            const movie = await storeMovie(req.body, actors)
            return res.status(200).json({
                ok: true,
                message: "Pelicula agregada con ÉXITO",
                url: `${req.protocol}://${req.get('host')}/api/v1/movies/${movie.id}`
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
    update: async (req, res) => {
        try {

            const movieUpdate = await updateMovie(req.params.id, req.body)

            return res.status(200).json({
                ok: true,
                message: "Pelicula actualizada con ÉXITO",
                data: movieUpdate
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
    delete: async (req, res) => {
        try {
            await deleteMovie(req.params.id)

            return res.status(200).json({
                ok: true,
                message: "Pelicula eliminada con ÉXITO",
            })
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok: false,
                status: error.status || 500,
                error: error.message || 'Upss, hubo un error...'
            })
        }
    }
  };