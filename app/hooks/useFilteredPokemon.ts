'use client';

import { useState, useMemo } from 'react';

interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
}

export function useFilteredPokemon(pokemons: Pokemon[]) {
  const [selectedType, setSelectedType] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredPokemons = useMemo(() => {
    return pokemons.filter(pokemon => {
      const matchesType = selectedType ? pokemon.types.includes(selectedType) : true;
      const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [pokemons, selectedType, searchTerm]);

  return {
    filteredPokemons,
    selectedType,
    setSelectedType,
    searchTerm,
    setSearchTerm
  };
} 