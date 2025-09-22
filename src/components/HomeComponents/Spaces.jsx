import SpaceCard from "./SpaceCard";
import { useState, useEffect } from "react";

const Spaces = ({ filteredSpaces: initialFilteredSpaces }) => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredSpaces, setFilteredSpaces] = useState(initialFilteredSpaces);

  useEffect(() => {
    if (!searchValue.trim()) {
      setFilteredSpaces(initialFilteredSpaces);
      return;
    }

    const searchTerm = searchValue.toLowerCase().trim();
    const filtered = initialFilteredSpaces.filter((space) => {
      const { name, location } = space;
      return (
        name?.toLowerCase().includes(searchTerm) ||
        location?.toLowerCase().includes(searchTerm)
      );
    });

    setFilteredSpaces(filtered);
  }, [searchValue, initialFilteredSpaces]);

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div
      className="w-[90%] mx-auto flex flex-col items-center py-2 px-4"
      id="spaces"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-3xl font-bold text-black ">
          Available Study Spaces
        </h2>
      
      </div>

      {/* Search bar */}
      <div className="w-full max-w-2xl mb-5">
        <div className="relative">
          <input
            type="text"
            placeholder="Search study spaces by name or location..."
            value={searchValue}
            onChange={handleInputChange}
            className="w-full p-3 pl-10 rounded-full bg-white border-2 border-black text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-300 shadow-lg transition-all duration-300"
          />
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {filteredSpaces.length > 0 ? (
        <>
          {/* Results count and subtle stats */}
          <div className="w-full max-w-7xl mb-8 flex justify-between items-center">
            <p className="text-gray-600">
              Showing{" "}
              <span className="font-semibold text-gray-800">
                {filteredSpaces.length}
              </span>
              {filteredSpaces.length === 1 ? " space" : " spaces"}
              {searchValue && (
                <span>
                  {" "}
                  for "<span className="font-semibold">{searchValue}</span>"
                </span>
              )}
            </p>
          </div>

          {/* Enhanced grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 w-full max-w-7xl">
            {filteredSpaces.map((space) => (
              <SpaceCard key={space.id} space={space} />
            ))}
          </div>
        </>
      ) : (
        /* Enhanced empty state */
        <div className="text-center py-20 min-h-[50vh] flex flex-col justify-center items-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">
            {searchValue ? "No matching spaces found" : "No spaces available"}
          </h3>
          <p className="text-gray-500 max-w-md mb-6">
            {searchValue
              ? "Try adjusting your search terms or browse all available spaces"
              : "Check back later for new study spaces"}
          </p>
          {searchValue && (
            <button
              onClick={() => setSearchValue("")}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-colors"
            >
              Clear Search
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Spaces;
