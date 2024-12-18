export interface Card {
  image: {
    default: string;
    srcset: string;
    sizes: string;
  };
  nombre: string;
  categoria: string;
}
