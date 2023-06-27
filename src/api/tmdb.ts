import axios, { AxiosInstance } from "axios";

import { Movie } from "../lib/types/Movie";
import { Actor } from "../lib/types/Actor";
import {
  API_KEY,
  BASE_URL,
  UPCOMING_URL,
  MOVIE_DETAILS_URL,
  ACTORS_URL,
} from "../lib/constants";

const HEADERS = {
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json;charset=utf-8",
};

const client: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: HEADERS,
});

export const getUpcomingMovies = async (): Promise<Movie[]> => {
  try {
    const response = await client.get(UPCOMING_URL);
    console.log("getUpcomingMovies", response.data.results);
    return response.data.results;
  } catch (error) {
    console.error("rrrrrrrrrrrrrr111111111111111", error);
    throw error;
  }
};

interface MovieDetailsCache {
  [id: number]: Movie;
}

let movieDetailsCache: MovieDetailsCache = {};

export const getMovieDetails = async (id: number): Promise<Movie> => {
  try {
    if (movieDetailsCache[id]) {
      console.log("Serving from cache");
      return movieDetailsCache[id];
    }

    const response = await client.get(`${MOVIE_DETAILS_URL}/${id}`);

    movieDetailsCache[id] = response.data;
    console.log("getMovieDetails", response.data);
    return response.data;
  } catch (error) {
    console.error("rrrrrrrrrrrrrr22222222222", error);
    throw error;
  }
};

export const getActors = async (id: number): Promise<Actor[]> => {
  try {
    const response = await client.get(
      `${MOVIE_DETAILS_URL}/${id}${ACTORS_URL}`
    );
    const { cast } = response.data;
    return cast.map((actor: Actor) => ({ ...actor, cast: [actor] }));
  } catch (error) {
    console.error("rrrrrrrrrrrrrr33333333333333", error);
    throw error;
  }
};

export const getMovieVideos = async (id: string): Promise<any> => {
  try {
    const response = await client.get(`/movie/${id}/videos`);
    return response.data.results;
  } catch (error) {
    console.error("rrrrrrrrrrrrrr44444444444", error);
    throw error;
  }
};
