const express = require ('express');
const { getMenu } = require('../controllers/menuController');

const router = express.Router()

router.get('/', getMenu);

module.exports = {
    menuRouter: router
}