"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface PokemonCardProps {
  id: number;
  name: string;
  image: string;
  types: string[];
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, image, types }) => {
  const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

  // Map Pokemon types to colors
  const typeColors: Record<string, string> = {
    normal: "bg-gray-400",
    fire: "bg-red-500",
    water: "bg-blue-500",
    electric: "bg-yellow-400",
    grass: "bg-green-500",
    ice: "bg-blue-200",
    fighting: "bg-red-700",
    poison: "bg-purple-500",
    ground: "bg-yellow-700",
    flying: "bg-indigo-300",
    psychic: "bg-pink-500",
    bug: "bg-green-400",
    rock: "bg-yellow-800",
    ghost: "bg-purple-700",
    dragon: "bg-indigo-700",
    dark: "bg-gray-800",
    steel: "bg-gray-500",
    fairy: "bg-pink-300",
  };

  return (
    <Link href={`/pokemon/${name}`} className="block">
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        <div className="p-4 flex flex-col items-center">
          <div className="w-32 h-32 relative">
            <Image
              src={image}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, 128px"
              className="object-contain"
              priority
            />
          </div>
          <h2 className="text-xl font-semibold mt-2 text-center text-gray-800">
            {formattedName}
          </h2>
          <div className="flex gap-2 mt-2 justify-center">
            {types.map((type) => (
              <span
                key={type}
                className={`${
                  typeColors[type] || "bg-gray-400"
                } text-white text-xs font-medium px-2.5 py-0.5 rounded-full`}
              >
                {type}
              </span>
            ))}
          </div>
        </div>
        <div className="px-4 pb-4 text-center">
          <Link
            href={`/pokemon/${name}`}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Details →
          </Link>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;
