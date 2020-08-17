const express = require("express")
const cors = require("cors")
const { Client } = require('pg')

const app = express()

app.use(cors())

const connectionString = 'postgres://postgres:123@localhost:5432/postgres'

const client = new Client({connectionString: connectionString})

client.connect()

app.get('/name', (req, res) => {
  client.query('select * from users', (err, data) => {
    res.send(data.rows)
  })
})

app.listen(3000, ()=>console.log("Started"))
