'use client';

import { useState, useEffect } from 'react';

interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
}

interface UsePokemonResult {
  pokemons: Pokemon[];
  types: string[];
  loading: boolean;
  error: string | null;
}

export function usePokemon(): UsePokemonResult {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/type');
        const data = await response.json();
        const typesList = data.results.map((type: { name: string }) => type.name);
        setTypes(typesList);
      } catch (err) {
        setError('Failed to fetch Pokémon types');
        console.error(err);
      }
    };

    const fetchPokemons = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();
        
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon: { name: string, url: string }) => {
            const res = await fetch(pokemon.url);
            const details = await res.json();
            
            return {
              id: details.id,
              name: details.name,
              image: details.sprites.other['official-artwork'].front_default || details.sprites.front_default,
              types: details.types.map((type: { type: { name: string } }) => type.type.name)
            };
          })
        );
        
        setPokemons(pokemonDetails);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch Pokémon data');
        setLoading(false);
        console.error(err);
      }
    };

    fetchTypes();
    fetchPokemons();
  }, []);

  return { pokemons, types, loading, error };
} 