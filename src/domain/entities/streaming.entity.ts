export class StreamingEntity {
   constructor(
      public readonly provider_id: number,
      public readonly provider_name: string,
      public readonly logo_path: string,
      public readonly display_priority: number,
   ) {}
}
