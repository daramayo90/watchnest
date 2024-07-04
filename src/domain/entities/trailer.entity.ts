export class TrailerEntity {
   constructor(
      public readonly id: string,
      public readonly key: string,
      public readonly name: string,
      public readonly site: string,
      public readonly size: number,
      public readonly type: string,
      public readonly official: boolean,
   ) {}

   public static fromObject(trailer: { [key: string]: any }): TrailerEntity {
      return new TrailerEntity(
         trailer.id,
         trailer.key,
         trailer.name,
         trailer.site,
         trailer.size,
         trailer.type,
         trailer.official,
      );
   }
}
