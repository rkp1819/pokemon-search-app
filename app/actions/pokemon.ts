'use server';

export async function getPokemonTypes() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/type');
    const data = await response.json();
    return data.results.map((type: { name: string }) => type.name);
  } catch (error) {
    console.error('Failed to fetch Pokémon types:', error);
    throw new Error('Failed to fetch Pokémon types');
  }
}

export async function getPokemonList(limit = 151) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Failed to fetch Pokémon list:', error);
    throw new Error('Failed to fetch Pokémon list');
  }
}

export async function getPokemonDetails(nameOrId: string | number) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
    const data = await response.json();
    
    return {
      id: data.id,
      name: data.name,
      image: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
      types: data.types.map((type: { type: { name: string } }) => type.type.name),
      stats: data.stats.map((stat: { base_stat: number, stat: { name: string } }) => ({
        name: stat.stat.name,
        value: stat.base_stat
      })),
      height: data.height,
      weight: data.weight,
      abilities: data.abilities.map((ability: { ability: { name: string } }) => ability.ability.name),
      moves: data.moves.slice(0, 5).map((move: { move: { name: string } }) => move.move.name)
    };
  } catch (error) {
    console.error(`Failed to fetch details for Pokémon ${nameOrId}:`, error);
    throw new Error(`Failed to fetch details for Pokémon ${nameOrId}`);
  }
} 