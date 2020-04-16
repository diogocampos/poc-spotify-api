require('dotenv').config()

const env = {
  PORT: Number(process.env.PORT) || 3000,
}

module.exports = Object.freeze(env)
