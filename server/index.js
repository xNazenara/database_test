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
  // client.query('select * from users', (err, data) => {
  //   res.send(data.rows)
  // })
  console.log(req.body)
  res.send('234')
})

app.listen(3000, ()=>console.log("Started"))
