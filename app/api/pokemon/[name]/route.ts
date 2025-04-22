import { NextResponse } from 'next/server';
import { getPokemonDetails } from '../../../actions/pokemon';

export async function GET(
  request: Request,
  context: { params: { name: string } }
) {
  try {
    const params = await Promise.resolve(context.params);
    const name = params.name;
    
    const pokemonData = await getPokemonDetails(name);
    return NextResponse.json(pokemonData);
  } catch (error) {
    console.error(`API route error:`, error);
    return NextResponse.json(
      { error: `Failed to fetch details for Pokémon ${context.params.name}` },
      { status: 500 }
    );
  }
} 