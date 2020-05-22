declare var require: (path: string) => string;

export const IconSet = {
  star: require('!svg-inline-loader!src/assets/icons/star-24px.svg'),
  star_outline: require('!svg-inline-loader!src/assets/icons/star_outline-24px.svg'),
  movie: require('!svg-inline-loader!src/assets/icons/movie-24px.svg'),
};

export type IconList = keyof typeof IconSet;
