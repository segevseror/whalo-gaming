export type PlayerType = {
  id: string;
  username: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export type Score = {
  id: string;
  score: number;
  createdAt: Date;
}
