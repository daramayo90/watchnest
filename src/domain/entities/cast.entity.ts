export class CastEntity {
   constructor(
      public readonly id: number,
      public readonly name: string,
      public readonly character: string,
      public readonly profile_path: string | null,
      public readonly known_for_department: string,
   ) {}

   public static fromObject(cast: { [key: string]: any }): CastEntity {
      return new CastEntity(
         cast.id,
         cast.name,
         cast.character,
         cast.profile_path,
         cast.known_for_department,
      );
   }
}
