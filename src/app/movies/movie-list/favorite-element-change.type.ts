import { Movie } from '../Movie';

export type FavoriteElementChange = {
  movie: Movie;
  isFavorite: boolean;
};
