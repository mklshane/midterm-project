import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (space) {
      const images = [space.main_image, ...(space.images || [])].filter(
        Boolean
      );
      setAllImages(images);
      if (space.time_slots && space.time_slots.length > 0) {
        setBookingDetails((prev) => ({
          ...prev,
          timeSlot: space.time_slots[0],
        }));
      }
    }
  }, [space]);

  // auto-rotate images every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 7000);

    return () => clearInterval(interval);
  }, [allImages.length]);

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

  const handleBookingChange = (field, value) => {
    setBookingDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (!space) {
    return (
      <motion.div
        className="min-h-screen bg-gray-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
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
          {/* Left Column - Content */}
          <div className="lg:col-span-2">
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-6 mb-6"
              variants={containerVariants}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ImageCarousel
                allImages={allImages}
                currentImageIndex={currentImageIndex}
                nextImage={nextImage}
                prevImage={prevImage}
                goToImage={goToImage}
              />
              <SpaceInfo
                name={name}
                spaceLocation={spaceLocation}
                price={price}
              />
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
