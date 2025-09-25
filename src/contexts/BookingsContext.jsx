import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useToast } from "./ToastContext";

const BookingsContext = createContext();

export function BookingsProvider({ children }) {
  const [bookings, setBookings] = useLocalStorage("bookings", []);
  const { addToast } = useToast();

  // adds a new booking to the list
  const addBooking = (newBooking) => {
    setBookings([...bookings, newBooking]);
    addToast("Booking added!", "success");
  };

  // remove a booking
  const removeBooking = (id) => {
    setBookings(bookings.filter((b) => b.id !== id));
    addToast("Booking cancelled", "info");
  };

  return (
    <BookingsContext.Provider
      value={{ bookings, addBooking, removeBooking }}
    >
      {children}
    </BookingsContext.Provider>
  );
}

export const useBookings = () => useContext(BookingsContext);
