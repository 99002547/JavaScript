const express = require('express')
const app=express()
const bodyParser = require('body-parser')
const cors = require('cors')
const apiRouter = require('./employeeApiRouter')
const hostname = '127.0.0.1'
const port = 3000

const jsonParser = bodyParser.json()
const urlEncodedParser = bodyParser.urlencoded({extended:false})
app.use(jsonParser)
app.use(urlEncodedParser)

app.use(cors())

app.use('/api',apiRouter)

app.listen(port,hostname,() =>{
    console.log('express server is started at http://'+hostname+':'+port)
})