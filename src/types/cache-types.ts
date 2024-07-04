export interface Key {
   id: string;
}

export interface Language {
   code: string;
}

export interface Locale {
   code: string;
}

export interface TTL {
   seconds: number;
}

export interface Value {
   [key: string]: any;
}
