const express = require("express")
const bodyParser = require('body-parser')
const cors = require("cors")
const { Client } = require('pg')

const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const connectionString = 'postgres://postgres:123@localhost:5432/postgres'

const client = new Client({connectionString: connectionString})

client.connect()

app.post('/post-create', (req, res) => {
  client.query(`
    insert into posts (
      title, value
    ) values (
      $1, $2
    )
  `,
  [req.body.titleValue, req.body.textValue],
  (err) => {
    if (err) {
      console.log(err)
    } else {
      res.send("Успешно добавлено!")
    }
  })

})

app.get('/posts-get', (req, res) => {
  client.query(`
      select * from posts
  `,
  (err, data) => {
    if (err) {
      console.log(err)
    } else {
      res.send(data.rows)
    }
  }
  )
})

app.listen(3000, ()=>console.log("Started"))
