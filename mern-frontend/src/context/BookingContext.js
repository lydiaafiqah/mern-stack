import { createContext, useReducer } from "react";

//create new context
export const BookingsContext = createContext()

export const bookingsReducer = (state, action) => {
   switch (action.type) {
      case 'SET_BOOKINGS':
         return {
            bookings: action.payload
         }
      case 'CREATE_BOOKING':
         return {
            bookings: [action.payload, ...state.bookings]
         }
      case 'DELETE_BOOKING':
            return {
               bookings: state.bookings.filter(booking => booking._id !== action.payload._id)
            }
      default:
         return state
   }
}

//provide context to the whole application, so our components can access it
export const BookingsContextProvider = ({ children }) => {
   const [state, dispatch] = useReducer(bookingsReducer, {
      bookings: null
   })

   return (
      <BookingsContext.Provider value={{...state, dispatch}}>
         {children}
      </BookingsContext.Provider>
   )
}