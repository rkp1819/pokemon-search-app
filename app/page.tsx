import React from "react";
import {
  getPokemonList,
  getPokemonTypes,
  getPokemonDetails,
} from "./actions/pokemon";
import ClientSideHome from "./components/ClientSideHome";

export const dynamic = "force-dynamic";

export default async function Home() {
  // Server-side fetch of Pokemon data
  const types = await getPokemonTypes();
  const pokemonList = await getPokemonList(151);

  // Fetch first batch of Pokemon details
  const firstBatchPromises = pokemonList
    .slice(0, 20)
    .map((pokemon: { name: string }) => getPokemonDetails(pokemon.name));
  const initialPokemons = await Promise.all(firstBatchPromises);

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 text-white bg-blue-600 py-4 rounded-lg shadow-md">
        Pokémon Search App
      </h1>

      <ClientSideHome
        initialPokemons={initialPokemons}
        allPokemonList={pokemonList}
        pokemonTypes={types}
      />
    </main>
  );
}
