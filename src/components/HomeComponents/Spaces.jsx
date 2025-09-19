import SpaceCard from "./SpaceCard";

const Spaces = ({ filteredSpaces }) => {
  return (
    <div
      className="w-[90%] mx-auto flex flex-col items-center py-2 px-4"
      id="spaces"
    >
      <div className="text-center mb-1">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
          Available Study Spaces
        </h2>
       
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
            </p>
            {/* Optional: Add filter/sort buttons here later */}
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
            No spaces found
          </h3>
          <p className="text-gray-500 max-w-md">
            Try adjusting your search terms or browse all available spaces
          </p>
         
        </div>
      )}
    </div>
  );
};

export default Spaces;
