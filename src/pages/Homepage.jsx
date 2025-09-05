import React from 'react'
import Navbar from '../components/HomeComponents/Navbar' 
import Hero from '@/components/HomeComponents/Hero';

const Homepage = () => {
  return (
    <div className="w-full h-screen">
      <div className="h-screen bg-beige">
        <Navbar />
        <Hero />
      </div>
    </div>
  );
}

export default Homepage