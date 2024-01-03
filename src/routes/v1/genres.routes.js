const router = require('express').Router();
const {index, show,store,update,delete : destroy} = require('../../controllers/apiGenres.Controller');

// api/v1/genres

router
    .get('/',index)
    .get('/:id',show)

module.exports = router;