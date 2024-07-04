export class CollectionEntity {
   constructor(
      public readonly id: number,
      public readonly name: string,
      public readonly poster_path: string,
      public readonly backdrop_path: string,
   ) {}
}
