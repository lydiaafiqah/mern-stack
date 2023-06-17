const Booking = require('../models/bookingModel')
const mongoose = require('mongoose')

//get all bookings
//exports.getBookings = 
const getBookings = async (req, res) => {
   const bookings = await Booking.find({}).sort({createdAt:-1}) //sort based on descending order

   res.status(200).json(bookings)
}


//get a single booking
const getBooking = async (req, res) => {
   const { id } = req.params

   if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error:'No such booking' })
   }

   const booking = await Booking.findById(id)

   if (!booking) {
      return res.status(404).json({ error:'No such booking' })
   }

   res.status(200).json(booking)
}

//create new booking
const createBooking = async (req, res) => {
   const {title, pax, venue} = req.body

   let emptyFields = []

   if (!title) {
      emptyFields.push('title')
   }
   if (!pax) {
      emptyFields.push('pax')
   }
   if (!venue) {
      emptyFields.push('venue')
   }

   if (emptyFields.length > 0) {
      return res.status(400).json({ error:'Please fill in all the fields', emptyFields })
   }

   // add doc to db
   try {
      const booking = await Booking.create({title, pax, venue})

      console.log(booking)
      
      res.status(200).json(booking)
   } catch (error) {
      res.status(400).json({ error:error.message })
   }
}

//delete a booking
const deleteBooking = async (req, res) => {
   const { id } = req.params

   if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error:'No such booking' })
   }

   const booking = await Booking.findOneAndDelete({_id:id})

   if (!booking) {
      return res.status(404).json({ error:'No such booking' })
   }

   res.status(200).json(booking)
}

//update a booking
const updateBooking = async (req, res) => {
   const { id } = req.params

   if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error:'No such booking' })
   }

   const booking = await Booking.findOneAndUpdate({_id:id}, {
      ...req.body //... will spread req.body objectin this doc
   })

   if (!booking) {
      return res.status(404).json({ error:'No such booking' })
   }

   res.status(200).json(booking)
}

module.exports = { createBooking, getBookings, getBooking, deleteBooking, updateBooking }