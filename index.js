// import dot.env 
require('dotenv').config()
//import express
const express = require('express')
// import cors
const cors = require('cors')
// import router
const router = require('./router')
// import connection
require('./connection')

// create server
const pfServer = express()

// server using cors
pfServer.use(cors())

//parse the data - middleware -parse the data
pfServer.use(express.json())

// use router
pfServer.use(router)

// exporting uploaded folder
pfServer.use('/upload',express.static('./uploads'))

// set port
const PORT = 4000 || process.env.PORT

// LISTEN
pfServer.listen(PORT,()=>{
  console.log(`server is running at port number ${PORT}`);
})


// // get
// pfServer.get('/',(req,res)=>{
//   res.send('get request recieved')
// })

// // post
// pfServer.post('/',(req,res)=>{
//   res.send('post request recieved')
// })


// // put
// pfServer.put('/',(req,res)=>{
//   res.send('put request recieved')
// })

// // delete
// pfServer.delete('/',(req,res)=>{
//   res.send('delete request recieved')
// })