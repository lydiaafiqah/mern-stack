const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bookingSchema = new Schema({
   title: {
      type: String,
      required: true
   },
   pax: {
      type: Number,
      required: true
   },
   venue: {
      type: String,
      required: true
   },
}, { timestamps:true })

module.exports = mongoose.model('Booking', bookingSchema)