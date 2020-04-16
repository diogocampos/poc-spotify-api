const app = require('./app')
const env = require('./env')

const port = env.PORT

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
