const express = require ('express');
const { getInfo } = require('../controllers/infoController');

const router = express.Router()

router.get('/', getInfo);

module.exports = {
    infoRouter: router
}