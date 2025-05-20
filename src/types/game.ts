export interface Car {
  id: number;
  carName: string;
  position: number;
  createdAt: string;
  updatedAt: string;
}

export interface GameData {
  gameId: number;
  cars: {
    cars: Car[];
  };
  isEnd: boolean;
  race: number;
  round: number;
}

export interface GameResponse {
  data: GameData;
} 