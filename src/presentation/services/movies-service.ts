import { MovieEntity } from '../../domain';

export class MovieService {
   async filterByTitle(movies: MovieEntity[], title: string): Promise<MovieEntity[]> {
      // Filter results that start with the search term
      let filteredResults = movies.filter((movie) =>
         movie.title.toLowerCase().startsWith(title.toLowerCase()),
      );

      // If no results start with the search term, use the original results
      if (filteredResults.length === 0) {
         filteredResults = movies;
      }

      // Sort by vote_count in descending order && Limit to 8 results
      return filteredResults.sort((a, b) => b.vote_count - a.vote_count).slice(0, 8);
   }
}
