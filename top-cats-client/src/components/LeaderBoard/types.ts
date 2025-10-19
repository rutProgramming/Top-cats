export type Player = {
  id: string;
  name: string;
  image_url?: string;
  score: number;
  isCurrentUser?: boolean;
};

export type AroundResponse =
  | { above: Player[]; user: Player; below: Player[] }
  | { around: Player[] }
  | Player[];

export type NewUser = { name: string; image_url: string; score: number };
export type EditUser = { id: string; score: number };
