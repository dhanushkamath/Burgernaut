const { ORDER_SERVICE_WELCOME_MSG } = require('../resources/constants');

/**
 * Fetch the welcome message.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getInfo = (req,res) => {
    res.status(200).json({message: ORDER_SERVICE_WELCOME_MSG});
}

module.exports = {
    getInfo: getInfo
}