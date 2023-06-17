import { useBookingsContext } from "../hooks/useBookingContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const BookingDetails = ({ booking }) => {
   const { dispatch } = useBookingsContext()

   const handleClick = async () => {
      const response = await fetch('/api/bookings/' + booking._id, {
         method: 'DELETE'
      })

      const json = await response.json()

      if (response.ok) {
         dispatch({ type:'DELETE_BOOKING', payload:json })
      }
   }

   return (
      <div className='booking-details'>
         <h4>{booking.title}</h4>
         <p><strong>No. of pax : </strong>{booking.pax}</p>
         <p><strong>Venue : </strong>{booking.venue}</p>
         <p>{formatDistanceToNow(new Date(booking.createdAt), { addSuffix:true })}</p>
         {/* <span className="material-symbols-outlined" style={{ color:'white', backgroundColor:'red', fontSize:'small', paddingLeft:'10px', paddingRight:'10px', borderRadius:'1.2rem' }} onClick={handleClick}>Delete</span> */}
         <span className="material-symbols-outlined" onClick={handleClick}>Delete</span>
      </div>
   )
}

export default BookingDetails