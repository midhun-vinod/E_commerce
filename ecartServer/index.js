require('dotenv').config()

const express = require('express')

const cors = require('cors')

require('./db/connection')

const router = require('./routes/router')

const server = express()

const PORT = 3000

server.use(cors())

server.use(express.json())

server.use(router)

// server.get('/',(req,res)=>{
//     res.send("E cart Started!!!!")
// })

server.listen(PORT,()=>{
    console.log(`ecart server started at port ${PORT}`);
})


