import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Navbar from "@/components/HomeComponents/Navbar";
import BookingPanel from "@/components/BookingComponents/BookingPanel";

const SpaceDetail = () => {
  const location = useLocation();
  const space = location.state?.space;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [allImages, setAllImages] = useState([]);

  const [bookingDetails, setBookingDetails] = useState({
    date: "",
    timeSlot: "",
  });

  // Initialize images when space data is available
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

  // Auto-rotate images every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 7000);

    return () => clearInterval(interval);
  }, [allImages.length]);

  // Navigation functions
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
    return <div>Loading...</div>;
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-18">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
              {/* Image Carousel */}
              <div className="relative h-96 overflow-hidden rounded-xl mb-8 group">
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={allImages[currentImageIndex]}
                    alt={`${name} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-102"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Navigation Arrows */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-3xl opacity-0 group-hover:opacity-100"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-3xl opacity-0 group-hover:opacity-100"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </>
                )}

                {/* Image Counter */}
                {allImages.length > 1 && (
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                    {currentImageIndex + 1} / {allImages.length}
                  </div>
                )}

                {/* Thumbnail Navigation */}
                {allImages.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                    {allImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentImageIndex
                            ? "bg-white scale-125 w-4"
                            : "bg-white/50 hover:bg-white/80"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {name}
                  </h1>
                  <p className="text-gray-600 mb-2">{spaceLocation}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-800">₱{price}</p>
                  <p className="text-sm text-gray-500">Starting price</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Description
                </h2>
                <p className="text-gray-700 leading-relaxed">{description}</p>
              </div>

              {/* Amenities */}
              {amenities && amenities.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    Amenities
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-green rounded-full mr-3"></span>
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Operating Hours */}
              {hours && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    Operating Hours
                  </h2>
                  <p className="text-gray-700">{hours}</p>
                </div>
              )}

              {/* Available Time Slots */}
              {time_slots && time_slots.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    Available Time Slots
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {time_slots.map((slot, index) => (
                      <span
                        key={index}
                        className="bg-green/10 text-green-800 px-4 py-2 rounded-full text-sm font-medium border border-green/20"
                      >
                        {slot}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Booking Panel */}
          <div className="lg:col-span-1">
            <BookingPanel
              space={space}
              bookingDetails={bookingDetails}
              onBookingChange={handleBookingChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceDetail;
