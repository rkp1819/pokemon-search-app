import { NextRequest, NextResponse } from 'next/server';
import { getPokemonDetails } from '../../../actions/pokemon';

export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  try {
    const name = params.name;
    const pokemonData = await getPokemonDetails(name);
    return NextResponse.json(pokemonData);
  } catch (error) {
    console.error(`API route error:`, error);
    return NextResponse.json(
      { error: `Failed to fetch details for Pokémon ${params.name}` },
      { status: 500 }
    );
  }
} 