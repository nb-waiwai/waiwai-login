import express from 'express'
import next from 'next'
import {type} from "os";

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.use(express.json())

  server.post('/api/login', (req, res) => {
    const data: { email?: unknown; password?: unknown } = req.body
    if (typeof data.email !== "string") {
      return res.status(400).end()
    }
    if (typeof data.password !== "string") {
      return res.status(400).end()
    }
    // 本来はDBの値をチェック
    if (data.email.startsWith('karube')) {
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