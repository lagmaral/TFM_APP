export interface Card {
  id:number,
  image: {
    default: string;
    srcset: string;
    sizes: string;
  };
  nombre: string;
  categoria: string;
}
