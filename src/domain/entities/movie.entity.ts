import { localeContext } from '../../context';
import { CastEntity, CollectionEntity, GenreEntity, StreamingEntity, TrailerEntity } from './';

export class MovieEntity {
   constructor(
      public readonly id: number,
      public readonly title: string,
      public readonly original_title: string,
      public readonly original_language: string,
      public readonly overview: string,
      public readonly genres: GenreEntity[],
      public readonly backdrop_path: string,
      public readonly poster_path: string,
      public readonly vote_count: number,
      public readonly status: string,
      public readonly belongs_to_collection: CollectionEntity,
      public readonly release_date: Date | null,
      public readonly trailer: TrailerEntity | null,
      public readonly cast: CastEntity[],
      public readonly streaming_platforms: StreamingEntity[],
   ) {}

   public static fromObject(movie: { [key: string]: any }): MovieEntity {
      const { release_date, videos, credits, 'watch/providers': watch_providers } = movie;

      const locale = localeContext.getLocale();

      let my_release_date: Date | null = null;
      let trailer: TrailerEntity | null = null;
      let streaming: StreamingEntity[] | [] = [];
      let cast: CastEntity[] | [] = [];

      if (release_date) {
         my_release_date = new Date(release_date);
      }

      if (videos?.results) {
         trailer = this.getTrailer(videos.results);
      }

      if (watch_providers) {
         streaming = this.getStreamings(watch_providers, locale);
      }

      if (credits?.cast) {
         cast = this.getCast(credits.cast);
      }

      return new MovieEntity(
         movie.id,
         movie.title,
         movie.original_title,
         movie.original_language,
         movie.overview,
         movie.genres,
         movie.backdrop_path,
         movie.poster_path,
         movie.vote_count,
         movie.status,
         movie.belongs_to_collection,
         my_release_date,
         trailer,
         cast,
         streaming,
      );
   }

   private static getCast(cast: { [key: string]: any }): CastEntity[] {
      return cast.slice(0, 10).map(CastEntity.fromObject) || [];
   }

   private static getStreamings(streaming: any, locale: string): StreamingEntity[] {
      return streaming.results[locale].flatrate || [];
   }

   private static getTrailer(videos: { [key: string]: any }): TrailerEntity | null {
      const trailer = videos.find((video: TrailerEntity) => {
         return (
            video.name === 'Official Trailer' &&
            video.site === 'YouTube' &&
            video.type === 'Trailer' &&
            video.official
         );
      });

      return trailer ? TrailerEntity.fromObject(trailer) : null;
   }
}
