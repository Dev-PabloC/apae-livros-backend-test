import express from "express"
import morgan from "morgan"
import { routes } from "../../app/routes"

async function main() {
  const app = express()
  app.use(morgan('dev'))
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use("/api", routes)
  app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  app.listen(3000)

  console.log('Server is running on port 3000')

  return app
}

main()