// API 서버의 기본 주소
// 개발 환경에서는 localhost:8080을 사용
// 프로덕션 환경에서는 실제 서버 주소로 변경 필요
export const API_BASE_URL = 'http://localhost:8080';

// API 엔드포인트
const API_ENDPOINT = '/games';  // 정확한 엔드포인트 주소

// 예시:
// 개발 환경: http://localhost:8080
// 프로덕션 환경: https://api.racing-game.com
// `${API_BASE_URL}/games/`는 http://localhost:8080/games/ 가 됩니다

export interface GameRequest {
  carNames: string;  // 쉼표로 구분된 문자열
  race: number;      // 시도 횟수
}

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
  success: boolean;
  message?: string;
  data: GameData;
}

export const startGame = async (request: GameRequest): Promise<GameResponse> => {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINT}`;
    console.log('Sending request to backend:', {
      url,
      method: 'POST',
      body: request
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        carNames: request.carNames,
        race: request.race
      }),
    });

    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Response data:', data);

    if (!response.ok) {
      // 백엔드에서 전달한 에러 메시지가 있다면 사용
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return {
      success: true,
      ...data
    };
  } catch (error) {
    console.error('Game start failed:', error);
    // 백엔드에서 전달한 에러 메시지가 있으면 그대로 사용
    return {
      success: false,
      message: error instanceof Error ? error.message : '게임 시작에 실패했습니다.',
      data: {
        gameId: 0,
        cars: {
          cars: []
        },
        isEnd: false
      }
    };
  }
}; 