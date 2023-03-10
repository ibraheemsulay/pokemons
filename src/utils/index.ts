import axios, { CancelToken } from 'axios';
import { PokemonListType } from './ts-types';

export const BASE_URL = 'https://pokeapi.co/api/v2';
export const Axios = axios.create({
  baseURL: BASE_URL,
});

export const fetchData = (cancelToken?: CancelToken) => async (url: string) => {
  const { data } = await Axios.get(url, {
    cancelToken,
  });
  return data;
};

export const getAllPokemons = async () => {
  let data: PokemonListType[] = [],
    next: boolean | null = true,
    offset = 0;

  do {
    try {
      const res = await fetchData()(`pokemon/?limit=500&offset=${offset}`);
      data = [...data, ...res.results];
      offset += 500;
      next = res.next;
    } catch {
      next = false;
    }
  } while (next);
  return data;
};

export const pokedexColors = {
  normal: '#A8A77A',
  fighting: '#C22E28',
  flying: '#A98FF3',
  poison: '#A33EA1',
  ground: '#E2BF65',
  rock: '#B6A136',
  bug: '#A6B91A',
  ghost: '#735797',
  steel: '#B7B7CE',
  fire: '#EE8130',
  water: '#6390F0',
  grass: '#7AC74C',
  electric: '#F7D02C',
  psychic: '#F95587',
  ice: '#96D9D6',
  dragon: '#6F35FC',
  dark: '#705746',
  fairy: '#D685AD',
  unknown: '#68A090',
  shadow: '#756BBC',
};

type PaginateType = {
  arr: PokemonListType[];
  pageSize: number;
  pageNumber: number;
};

export const paginateFunction = ({
  arr,
  pageSize,
  pageNumber,
}: PaginateType) => {
  const start = pageSize * (pageNumber - 1);
  const end = pageSize * pageNumber;
  return {
    *[Symbol.iterator]() {
      for (let i = start; i < arr.length && i < end; i++) {
        yield arr[i];
      }
    },
  };
};

export const getRandomColor = () => {
  const colors = Object.keys(pokedexColors);
  const index = Math.floor(Math.random() * colors.length);
  const selectedColor = colors[index] as keyof typeof pokedexColors;

  return pokedexColors[selectedColor];
};
