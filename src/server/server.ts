import express from 'express'
import next from 'next'
import { PrismaClient } from '@prisma/client'
import {toHash} from "./toHash";
const prisma = new PrismaClient()

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.use(express.json())

  server.get('/api/users', async (req, res) => {
    const users = await prisma.user.findMany()
    res.send(users)
  })

  server.post('/api/login', async (req, res) => {
    const data: { email?: unknown; password?: unknown } = req.body
    if (typeof data.email !== "string") {
      return res.status(400).end()
    }
    if (typeof data.password !== "string") {
      return res.status(400).end()
    }
    // 本来はDBの値をチェック
    const user = await prisma.user.findFirst({where: {email: data.email, passwordHash: toHash(data.password)}})
    if (user) {
      res.send('OK')
    } else {
      res.status(401).end()
    }
  })

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, () => {
    // if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})