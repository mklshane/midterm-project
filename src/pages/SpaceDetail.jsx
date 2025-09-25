import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { motion } from "framer-motion";
import Navbar from "@/components/HomeComponents/Navbar";
import BookingPanel from "@/components/SpaceDetailComponents/BookingPanel";
import ImageCarousel from "@/components/SpaceDetailComponents/ImageCarousel";
import SpaceInfo from "@/components/SpaceDetailComponents/SpaceInfo";
import SpaceDetails from "@/components/SpaceDetailComponents/SpaceDetails";
import animations from "@/utils/animation";

const { containerVariants } = animations.containers;

const SpaceDetail = () => {
  const location = useLocation();
  const space = location.state?.space; 
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [allImages, setAllImages] = useState([]);
  const [bookingDetails, setBookingDetails] = useState({
    date: "",
    timeSlot: "",
  });

  // scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // prepare images & default booking details when space data changes
  useEffect(() => {
    if (space) {
      const images = [space.main_image, ...(space.images || [])].filter(
        Boolean
      );
      setAllImages(images);

      // pre-select first available time slot if exists
      if (space.time_slots && space.time_slots.length > 0) {
        setBookingDetails((prev) => ({
          ...prev,
          timeSlot: space.time_slots[0],
        }));
      }
    }
  }, [space]);

  // auto-rotate carousel images every 7 seconds
  useEffect(() => {
    if (allImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 7000);

    return () => clearInterval(interval);
  }, [allImages.length]);

  // image navigation helpers
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? allImages.length - 1 : prevIndex - 1
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  // handle booking form field changes
  const handleBookingChange = (field, value) => {
    setBookingDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // fallback loader if space is not yet available
  if (!space) {
    return (
      <motion.div
        className="min-h-screen bg-gray-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* spinning loader */}
        <motion.div
          animate={{
            rotate: 360,
            transition: {
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            },
          }}
          className="w-8 h-8 border-4 border-green border-t-transparent rounded-full"
        />
      </motion.div>
    );
  }

  // destructure space data 
  const {
    name,
    location: spaceLocation,
    price,
    description,
    amenities,
    hours,
    time_slots,
  } = space;

  return (
    <motion.div
      className="min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      <motion.div
        className="max-w-7xl mx-auto px-4 py-18"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images & Space Info */}
          <div className="lg:col-span-2">
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-6 mb-6"
              variants={containerVariants}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* carousel with image navigation */}
              <ImageCarousel
                allImages={allImages}
                currentImageIndex={currentImageIndex}
                nextImage={nextImage}
                prevImage={prevImage}
                goToImage={goToImage}
              />

              {/* space name, location, price */}
              <SpaceInfo
                name={name}
                spaceLocation={spaceLocation}
                price={price}
              />

              {/* details such as description, amenities, hours, and slots */}
              <SpaceDetails
                description={description}
                amenities={amenities}
                hours={hours}
                time_slots={time_slots}
              />
            </motion.div>
          </div>

          {/* Right Column - Booking Panel */}
          <motion.div
            className="lg:col-span-1"
            variants={animations.slides.slideInRight}
            initial="hidden"
            animate="visible"
          >
            <BookingPanel
              space={space}
              bookingDetails={bookingDetails}
              onBookingChange={handleBookingChange}
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SpaceDetail;
