require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const app = express()

const bookingRoutes = require('./routes/bookingRoutes')

//middleware => this function will fire for every requests come in
//method 1
app.use(express.json()) //parses incoming JSON requests then, puts the parsed data in req.body

//method 2
//const bodyParser = require('body-parser')
//app.use(bodyParser.json({ limit:'50mb', extended:true })); //nak system use json
//app.use(bodyParser.urlencoded({ limit:'50mb', extended:true })); //nak data tu read dlm req.body

app.use((req, res, next) => {
   console.log(req.path, req.method)
   next()
})

//routes
app.use('/api/bookings', bookingRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI).then(() => {
   app.listen(process.env.PORT, () => {
      console.log('Connected to db & listening on port', process.env.PORT)
   })
}).catch(error => {
   console.log(error);
})

process.env