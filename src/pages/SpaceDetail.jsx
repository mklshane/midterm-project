import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/HomeComponents/Navbar";

const SpaceDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  const space = location.state?.space;

  // Carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [allImages, setAllImages] = useState([]);
  const [bookingDetails, setBookingDetails] = useState({
    date: "",
    hours: 1,
    timeSlot: "",
  });

  // Initialize images when space data is available
  useEffect(() => {
    if (space) {
      const images = [space.main_image, ...(space.images || [])].filter(
        Boolean
      );
      setAllImages(images);
      // Set default time slot if available
      if (space.time_slots && space.time_slots.length > 0) {
        setBookingDetails((prev) => ({
          ...prev,
          timeSlot: space.time_slots[0],
        }));
      }
    }
  }, [space]);

  // Auto-rotate images every 3 seconds
  useEffect(() => {
    if (allImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

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

  const handleBookNow = () => {
    if (!isLoggedIn) {
      return; // Prevent booking if not logged in
    }
    // Handle booking logic here
    console.log("Booking details:", bookingDetails);
    // navigate to booking confirmation page
  };

  // Check if space exists before destructuring
  if (!space) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Space Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The space you're looking for doesn't exist or the link is invalid.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-green text-white rounded-lg hover:bg-green transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  // Destructure space data using only provided fields
  const {
    name,
    location: spaceLocation,
    price,
    description,
    amenities,
    hours,
    time_slots,
  } = space;

  const totalPrice = price * bookingDetails.hours;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-18">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              {/* Image Carousel */}
              <div className="relative h-80 overflow-hidden rounded-lg mb-6">
                <img
                  src={allImages[currentImageIndex]}
                  alt={`${name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500"
                />

                {/* Navigation Arrows */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
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
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
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

                {/* Image Indicators */}
                {allImages.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {allImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          index === currentImageIndex
                            ? "bg-white scale-125"
                            : "bg-white/50 hover:bg-white/70"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {name}
                  </h1>
                  <p className="text-gray-600 mb-2">{spaceLocation}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-800">
                    ₱{price}/hour
                  </p>
                  <p className="text-sm text-gray-500">Starting price</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3 text-gray-800">
                  Description
                </h2>
                <p className="text-gray-700 leading-relaxed">{description}</p>
              </div>

              {/* Amenities */}
              {amenities && amenities.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3 text-gray-800">
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
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3 text-gray-800">
                    Operating Hours
                  </h2>
                  <p className="text-gray-700">{hours}</p>
                </div>
              )}

              {/* Available Time Slots */}
              {time_slots && time_slots.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3 text-gray-800">
                    Available Time Slots
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {time_slots.map((slot, index) => (
                      <span
                        key={index}
                        className="bg-green text-black px-3 py-1 rounded-full text-sm"
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
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
              {isLoggedIn ? (
                <>
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    Book This Space
                  </h2>

                  {/* Date Selection */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      className="w-full p-2 border border-gray-300 rounded-md text-sm"
                      value={bookingDetails.date}
                      onChange={(e) =>
                        handleBookingChange("date", e.target.value)
                      }
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>

                  {/* Time Slot Selection */}
                  {time_slots && time_slots.length > 0 && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Time Slot
                      </label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        value={bookingDetails.timeSlot}
                        onChange={(e) =>
                          handleBookingChange("timeSlot", e.target.value)
                        }
                      >
                        {time_slots.map((slot, index) => (
                          <option key={index} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Duration Selection */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration (hours)
                    </label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md text-sm"
                      value={bookingDetails.hours}
                      onChange={(e) =>
                        handleBookingChange("hours", parseInt(e.target.value))
                      }
                    >
                      <option value={1}>1 hour</option>
                      <option value={2}>2 hours</option>
                      <option value={3}>3 hours</option>
                      <option value={4}>4 hours</option>
                    </select>
                  </div>

                  {/* Price Summary */}
                  <div className="border-t pt-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">
                        ₱{price} × {bookingDetails.hours} hours
                      </span>
                      <span className="font-semibold">₱{totalPrice}</span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-bold mt-3 pt-3 border-t">
                      <span>Total</span>
                      <span className="text-green">₱{totalPrice}</span>
                    </div>
                  </div>

                  {/* Book Now Button */}
                  <button
                    onClick={handleBookNow}
                    className="w-full bg-green hover:bg-green/70 text-white py-3 px-4 rounded-4xl font-semibold transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    disabled={!bookingDetails.date}
                  >
                    Book Now
                  </button>

                  <p className="text-xs text-gray-500 text-center mt-3">
                    You will not be charged yet
                  </p>
                </>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-green"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Ready to Book?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Login to reserve this space and start your productive
                    session
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceDetail;
