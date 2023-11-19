const mongoose = require('mongoose');
const logger = require('pino')()
require('dotenv').config()

async function connect() {
    const dbUri = process.env.DB_URI;
    try {
        await mongoose.connect(dbUri)
        logger.info("Database connected")
    } catch (error) {
        logger.error(error)
        process.exit(1);
    }
}

module.exports = connect;