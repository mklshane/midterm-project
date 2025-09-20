import Navbar from '@/components/HomeComponents/Navbar'
import React from 'react'
import { useAuth } from '@/contexts/AuthContext'

const Bookings = () => {

  const { isLoggedIn } = useAuth();

  return (
    <div>
        <Navbar />
    </div>
  )
}

export default Bookings