export interface Eventos {
  id?: string;
  nome: string;
  dataInicio: string;
  dataFim: string;
  tipo: string;
}

export enum Tipo {
  red = 1,
  blue = 2,
  purple = 3,
  green = 4,
  orange = 5,
  gray = 6,
}
