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
}

export interface GameResponse {
  data: GameData;
} 