import { useState } from "react"
import { useBookingsContext } from "../hooks/useBookingContext"

const BookingForm = () => {
   const { dispatch } = useBookingsContext()
   const [ title, setTitle ] = useState('')
   const [ pax, setPax ] = useState('')
   const [ venue, setVenue ] = useState('')
   const [ error, setError ] = useState(null)
   const [ emptyFields, setEmptyFields ] = useState([])

   const handleSubmit = async (e) => {
      e.preventDefault()

      const booking = {title, pax, venue}

      const response = await fetch('/api/bookings', {
         method: 'POST',
         body: JSON.stringify(booking),
         headers: {
            'Content-Type': 'application/json'
         }
      })

      const json = await response.json()

      if (!response.ok) {
         setError(json.error)
         setEmptyFields(json.emptyFields)
      }
      if (response.ok) {
         setTitle('')
         setPax('')
         setVenue('')
         setError(null)
         console.log('New booking added', json)
         dispatch({ type:'CREATE_BOOKING', payload:json })
      }
   }

   return (
      <form className='create' onSubmit={handleSubmit}>
         <h3>Add a New Stuff</h3>

         <label>Title :</label>
         <input type='text' value={title} onChange={e => setTitle(e.target.value)} className={emptyFields.includes('title') ? 'error' : ''} />

         <label>No. of Pax :</label>
         <input type='number' value={pax} onChange={e => setPax(e.target.value)} className={emptyFields.includes('pax') ? 'error' : ''}  />

         <label>Venue :</label>
         <input type='text' value={venue} onChange={e => setVenue(e.target.value)} className={emptyFields.includes('venue') ? 'error' : ''}  />

         <button>Add Stuff</button>
         {error && <div className='error'>{error}</div>}
      </form>
   )
}

export default BookingForm