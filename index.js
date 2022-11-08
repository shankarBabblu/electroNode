var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var mysql = require('mysql')

var app = express()
app.use(cors())
app.use(bodyParser.json())

var connection = mysql.createConnection({
    user: 'sql12549821',
    password: 'sabNEeNLqe',
    host: 'sql12.freesqldatabase.com',
    port: 3306,
    database: 'sql12549821'
})

connection.connect( err => {
    if(err) console.log(err)
    console.log('database connection acquired')
})

app.get('/users', (request, response) => {
    let query = `select * from users`;
    connection.query(query, (err, result) => {
        if(err) response.send(err)
        response.send(result)
    })
})

app.post('/user', (request, response) => {
    let username = request.body.username;
    let password = request.body.password
    let query = `select * from users where username = ${username} and password = ${password}`
    connection.query(query, (err, result) => {
        if(err)  response.send(err);
        response.send(result)
    })
})

let port = process.env.PORT || 3000

app.listen(port, ()=> {
    console.log(`we are live and running on ${port}`)
})