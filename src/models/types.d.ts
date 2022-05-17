type Types =
  | 'Normal'
  | 'Fire'
  | 'Water'
  | 'Grass'
  | 'Electric'
  | 'Ice'
  | 'Fighting'
  | 'Poison'
  | 'Ground'
  | 'Psychic'
  | 'Bug'
  | 'Rock'
  | 'Ghost'
  | 'Dark'
  | 'Dragon'
  | 'Steel'
  | 'Fairy'
  | 'Flying';

type Sexes = 'Male' | 'Female' | 'Unknown';

type Pokemon = {
  name: string;
  photo: string;
  sex: Sexes;
  type: Type;
  id: string;
  count: number;
  price: number;
};

export type List = Pokemon[];

export type CartType = {
  list: List;
  price: number;
};
