import React from "react";
import { Link } from "react-router";

const SpaceCard = ({ space }) => {
  const { id, main_image, name, location, description, price } = space;

  return (
    <div className="relative w-full max-w-sm rounded-lg overflow-hidden bg-white border border-gray-200 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-gray-300 group flex flex-col h-full">
      <div className="overflow-hidden h-45">
        {" "}
        <Link to={`space/${id}`} state={{space}} >
          <img
            src={main_image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-2">
          <h3 className="text-xl font-semibold text-gray-800 group-hover:text-gray-900 transition-colors line-clamp-1">
            {name}
          </h3>
          <p className="text-md text-gray-500 group-hover:text-gray-600 transition-colors mt-1">
            {location}
          </p>
        </div>

        <p className="text-gray-500 text-sm mb-3 group-hover:text-gray-600 transition-colors line-clamp-2 h-10">
          {description}
        </p>

        <div className="border-t border-gray-200 my-3 group-hover:border-gray-300 transition-colors mt-auto"></div>

        <div className="flex justify-between items-center">
          <p className="text-lg text-black/90 font-bold group-hover:text-black transition-colors">
            ₱{price}
          </p>

          <Link to={`/space/${id}`} state={{ space }}>
            <button className="w-9 h-9 bg-black rounded-full flex items-center justify-center text-white hover:bg-green/70 hover:text-black transition-all duration-300 flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-up-right"
              >
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SpaceCard;
