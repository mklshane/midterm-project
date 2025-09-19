import React, { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useLocation } from "react-router";
import LoginModal from "./LoginModal";

const Navbar = () => {
  const { isLoggedIn, userName, logout } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activeLink, setActiveLink] = useState("home");
  const profileDropdownRef = useRef(null);
  const lastScrollY = useRef(0);
  const location = useLocation();

  const getLinkClasses = (linkName) => {
    const baseClasses = "px-3 py-1 rounded-full transition-colors";
    const activeClasses = "bg-gray-300 bg-opacity-50 text-black font-medium";
    const inactiveClasses = "text-black hover:bg-gray-200";

    return `${baseClasses} ${
      activeLink === linkName ? activeClasses : inactiveClasses
    }`;
  };

  // Combined scroll handlers
  const handleNavScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    // Navbar visibility
    if (currentScrollY <= 0) {
      setIsVisible(true);
    } else if (currentScrollY < lastScrollY.current) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

    lastScrollY.current = currentScrollY;

    // Section detection (only on homepage)
    if (location.pathname === "/") {
      const homeSection = document.getElementById("home");
      const spacesSection = document.getElementById("spaces");

      if (!homeSection || !spacesSection) return;

      const scrollPosition = currentScrollY + 100;
      const homePosition = homeSection.offsetTop;
      const homeHeight = homeSection.offsetHeight;
      const spacesPosition = spacesSection.offsetTop;

      if (scrollPosition < homePosition + homeHeight) {
        setActiveLink("home");
      } else if (scrollPosition >= spacesPosition) {
        setActiveLink("spaces");
      }
    }
  }, [location.pathname]);

  // Close dropdown on outside click
  const handleClickOutside = useCallback((event) => {
    if (
      profileDropdownRef.current &&
      !profileDropdownRef.current.contains(event.target)
    ) {
      setIsProfileDropdownOpen(false);
    }
  }, []);

  // Main useEffect for all event listeners
  useEffect(() => {
    // Set active link based on route
    if (location.pathname === "/my-bookings") {
      setActiveLink("my-bookings");
    } else if (location.hash === "#spaces") {
      setActiveLink("spaces");
    } else if (location.pathname === "/" && !location.hash) {
      setActiveLink("home");
    }

    window.addEventListener("scroll", handleNavScroll);
    document.addEventListener("mousedown", handleClickOutside);
    handleNavScroll();

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleNavScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [location, handleNavScroll, handleClickOutside]);

  const handleNavClick = (link) => {
    setActiveLink(link);

    if ((link === "home" || link === "spaces") && location.pathname !== "/") {
      window.location.href = `/#${link}`;
      return;
    }

    if (link === "home" || link === "spaces") {
      setTimeout(() => {
        const element = document.getElementById(link);
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 80,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 py-5 z-50 transition-all duration-300 bg-transparent ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto px-10 flex justify-between items-center">
        <Link
          to="/"
          className="flex-shrink-0 flex items-center space-x-2 text-xl font-bold text-green"
          onClick={() => setActiveLink("home")}
        >
          <span>StudySpot PH</span>
        </Link>

        <div
          className="flex-grow-0 flex gap-4 px-6 py-1.25 rounded-4xl border-2"
          style={{ backgroundColor: "#ffffff" }}
        >
          {location.pathname === "/" ? (
            <a
              href="#home"
              className={getLinkClasses("home")}
              onClick={() => handleNavClick("home")}
            >
              Home
            </a>
          ) : (
            <Link
              to="/#home"
              className={getLinkClasses("home")}
              onClick={() => handleNavClick("home")}
            >
              Home
            </Link>
          )}

          {location.pathname === "/" ? (
            <a
              href="#spaces"
              className={getLinkClasses("spaces")}
              onClick={() => handleNavClick("spaces")}
            >
              Spaces
            </a>
          ) : (
            <Link
              to="/#spaces"
              className={getLinkClasses("spaces")}
              onClick={() => handleNavClick("spaces")}
            >
              Spaces
            </Link>
          )}

          <Link
            to="/my-bookings"
            className={getLinkClasses("my-bookings")}
            onClick={() => setActiveLink("my-bookings")}
          >
            Bookings
          </Link>
        </div>

        {isLoggedIn ? (
          <div className="flex-shrink-0 flex items-center">
            <div
              className="relative bg-white py-2 px-4 border-2 rounded-4xl"
              ref={profileDropdownRef}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsProfileDropdownOpen(!isProfileDropdownOpen);
                }}
                className="flex items-center space-x-2 text-black hover:text-[#b0ce29] transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-[#faffe4] flex items-center justify-center text-[#96b702] font-medium ">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <span>Hi, {userName}</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isProfileDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-[#faffe4]"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <button
            className="flex-shrink-0 bg-white  px-5 text-black rounded-4xl text-[16px] transition-colors py-2 hover:bg-green border-2"
            onClick={() => setIsLoginOpen(true)}
          >
            Login
          </button>
        )}
      </div>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </nav>
  );
};

export default Navbar;
