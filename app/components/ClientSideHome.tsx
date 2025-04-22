"use client";

import { useState, useEffect } from "react";
import { useFilteredPokemon } from "../hooks/useFilteredPokemon";
import SearchForm from "./SearchForm";
import PokemonCard from "./PokemonCard";

interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
}

interface ClientSideHomeProps {
  initialPokemons: Pokemon[];
  allPokemonList: { name: string }[];
  pokemonTypes: string[];
}

export default function ClientSideHome({
  initialPokemons,
  allPokemonList,
  pokemonTypes,
}: ClientSideHomeProps) {
  const [pokemons, setPokemons] = useState<Pokemon[]>(initialPokemons);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedCount, setLoadedCount] = useState(initialPokemons.length);
  const [hasMore, setHasMore] = useState(true);

  const {
    filteredPokemons,
    selectedType,
    setSelectedType,
    searchTerm,
    setSearchTerm,
  } = useFilteredPokemon(pokemons);

  // Load more Pokemon only when user scrolls near the bottom
  const loadMorePokemons = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    try {
      // Load next batch of 10 Pokemon
      const nextBatch = allPokemonList.slice(loadedCount, loadedCount + 10);

      if (nextBatch.length === 0) {
        setHasMore(false);
        setIsLoading(false);
        return;
      }

      // Fetch details for this batch
      const pokemonDetailsPromises = nextBatch.map(async (pokemon) => {
        try {
          const res = await fetch(`/api/pokemon/${pokemon.name}`);
          if (!res.ok) throw new Error(`Failed to fetch ${pokemon.name}`);
          return await res.json();
        } catch (error) {
          console.error(`Error fetching ${pokemon.name}:`, error);
          return null;
        }
      });

      const newPokemons = await Promise.all(pokemonDetailsPromises);
      const validPokemons = newPokemons.filter((p) => p !== null);

      setPokemons((prev) => [...prev, ...validPokemons]);
      setLoadedCount((prev) => prev + nextBatch.length);

      if (loadedCount + nextBatch.length >= allPokemonList.length) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading additional Pokemon:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Add scroll event listener to detect when to load more
  useEffect(() => {
    const handleScroll = () => {
      // If we're near the bottom of the page, load more
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 500 &&
        !isLoading &&
        hasMore
      ) {
        loadMorePokemons();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, hasMore, loadedCount]);

  return (
    <>
      <SearchForm
        types={pokemonTypes}
        selectedType={selectedType}
        searchTerm={searchTerm}
        onTypeChange={setSelectedType}
        onSearchChange={setSearchTerm}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.image}
            types={pokemon.types}
          />
        ))}
      </div>

      {filteredPokemons.length === 0 && !isLoading && (
        <div className="text-center py-10">
          <p className="text-xl text-gray-500">
            No Pokémon found. Try a different search.
          </p>
        </div>
      )}

      {isLoading && (
        <div className="text-center py-10">
          <p className="text-xl text-gray-500">Loading more Pokémon...</p>
        </div>
      )}

      {!isLoading && !hasMore && loadedCount > 20 && (
        <div className="text-center py-10">
          <p className="text-gray-500">All Pokémon loaded!</p>
        </div>
      )}
    </>
  );
}
