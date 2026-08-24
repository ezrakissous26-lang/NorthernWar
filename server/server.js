import express from 'express'
import dotenv from 'dotenv/config'
import { router } from './routes/route.js'
import { clientConnect } from './db/connect.js'
import cors from 'cors'

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())

app.use('/', router)

async function startServer() {
  await clientConnect()

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
}

await startServer()