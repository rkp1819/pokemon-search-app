import React from "react";
import Image from "next/image";
import { getPokemonDetails } from "../../actions/pokemon";
import Breadcrumb from "../../components/Breadcrumb";

interface PokemonDetailPageProps {
  params: {
    name: string;
  };
}

interface PokemonStat {
  name: string;
  value: number;
}

export default async function PokemonDetailPage({
  params,
}: PokemonDetailPageProps) {
  const { name } = params;
  const pokemonData = await getPokemonDetails(name);

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

  const formattedName =
    pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);

  // Setup breadcrumb items
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: formattedName, href: `/pokemon/${name}` },
  ];

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto bg-gray-900">
      <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-4">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden mt-4">
        <div className="p-6 bg-blue-100">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="w-64 h-64 relative">
                <Image
                  src={pokemonData.image}
                  alt={pokemonData.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 256px"
                  priority
                />
              </div>
            </div>

            <div className="w-full md:w-2/3 mt-6 md:mt-0">
              <h1 className="text-3xl font-bold mb-2 text-gray-800">
                {formattedName}
              </h1>
              <p className="text-lg mb-2 text-gray-700">
                #{pokemonData.id.toString().padStart(3, "0")}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {pokemonData.types.map((type: string) => (
                  <span
                    key={type}
                    className={`${
                      typeColors[type] || "bg-gray-400"
                    } text-white text-xs font-medium px-3 py-1 rounded-full`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h2 className="text-xl font-semibold mb-2 text-gray-800">
                    Details
                  </h2>
                  <p className="text-gray-700">
                    <span className="font-medium">Height:</span>{" "}
                    {pokemonData.height / 10} m
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Weight:</span>{" "}
                    {pokemonData.weight / 10} kg
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-2 text-gray-800">
                    Abilities
                  </h2>
                  <ul className="list-disc list-inside text-gray-700">
                    {pokemonData.abilities.map((ability: string) => (
                      <li key={ability}>
                        {ability
                          .split("-")
                          .map(
                            (word: string) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pokemonData.stats.map((stat: PokemonStat) => (
              <div key={stat.name} className="mb-2">
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-gray-700">
                    {stat.name
                      .split("-")
                      .map(
                        (word: string) =>
                          word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </span>
                  <span className="text-gray-700">{stat.value}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${(stat.value / 255) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">
            Some Moves
          </h2>
          <div className="flex flex-wrap gap-2">
            {pokemonData.moves.map((move: string) => (
              <span
                key={move}
                className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded"
              >
                {move
                  .split("-")
                  .map(
                    (word: string) =>
                      word.charAt(0).toUpperCase() + word.slice(1)
                  )
                  .join(" ")}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  // This function is used for static generation at build time
  // For this demo, we'll just return an empty array
  return [];
}
