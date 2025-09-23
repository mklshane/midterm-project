import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useToast } from "./ToastContext";

const BookingsContext = createContext();

export function BookingsProvider({ children }) {
  const [bookings, setBookings] = useLocalStorage("bookings", []);
  const { addToast } = useToast();

  const addBooking = (newBooking) => {
    setBookings([...bookings, newBooking]);
    addToast("Booking added!", "success");
  };

  const removeBooking = (id) => {
    setBookings(bookings.filter((b) => b.id !== id));
    addToast("Booking cancelled", "info");
  };

  const clearBookings = () => {
    setBookings([]);
    addToast("All bookings cleared", "error");
  };

  return (
    <BookingsContext.Provider
      value={{ bookings, addBooking, removeBooking, clearBookings }}
    >
      {children}
    </BookingsContext.Provider>
  );
}

export const useBookings = () => useContext(BookingsContext);
