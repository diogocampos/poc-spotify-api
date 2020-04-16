require('dotenv').config()

const env = {
  PORT: Number(process.env.PORT) || 3001,
}

module.exports = Object.freeze(env)
