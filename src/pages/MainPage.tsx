import { useState } from 'react';
import styled from 'styled-components';
import Input from '../components/Input';
import Button from '../components/Button';
import RacingBackground from '../components/RacingBackground';
import { startGame } from '../api/gameApi';
import type { GameRequest, GameResponse } from '../api/gameApi';
import { useNavigate } from 'react-router-dom';

const PageContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  padding: 0 20px;
  position: relative;
  z-index: 1;
`;

const Title = styled.h1`
  font-family: 'Gaegu', cursive;
  font-size: 3rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const InputLabel = styled.label`
  font-family: 'Gaegu', cursive;
  font-size: 1.2rem;
  font-weight: 400;
  color: #333;
  margin-bottom: 0.5rem;
  display: block;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  background: rgba(255, 255, 255, 0.85);
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
  width: 100%;
`;

const ErrorMessage = styled.div`
  font-family: 'Gaegu', cursive;
  color: #ff6b6b;
  font-size: 0.9rem;
  margin: 8px 0;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 6px 12px;
  background-color: rgba(255, 107, 107, 0.1);
  border-radius: 6px;
  border: 1px solid rgba(255, 107, 107, 0.2);
`;

const MainPage = () => {
  const [carNames, setCarNames] = useState('');
  const [raceCount, setRaceCount] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (carNames.trim() === '') {
        throw new Error('자동차 이름을 입력해주세요.');
      }

      const count = parseInt(raceCount);
      if (isNaN(count) || count <= 0) {
        throw new Error('시도할 횟수는 1 이상이어야 합니다.');
      }

      const request: GameRequest = {
        carNames: carNames.trim(),
        race: count
      };

      const response = await startGame(request);
      
      if (response.success) {
        // 응답 데이터를 state로 전달
        navigate('/game-result', { state: { gameData: response } });
      } else {
        throw new Error(response.message || '게임 시작에 실패했습니다.');
      }
    } catch (err) {
      console.error('Error in handleSubmit:', err);
      setError(err instanceof Error ? err.message : '게임 시작에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRaceCountChange = (value: string) => {
    setError(null);
    const num = parseInt(value);
    if (isNaN(num) || num <= 0) {
      setRaceCount('');
      return;
    }
    setRaceCount(value);
  };

  const isValid = carNames.trim() !== '' && raceCount.trim() !== '';

  return (
    <PageContainer>
      <RacingBackground />
      <Container>
        <Title>자동차 경주 게임</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            label="자동차 이름"
            value={carNames}
            onChange={setCarNames}
            placeholder="자동차 이름을 쉼표(,)로 구분하여 입력하세요"
          />
          <Input
            label="시도할 횟수"
            value={raceCount}
            onChange={handleRaceCountChange}
            type="number"
            placeholder="시도할 횟수를 입력하세요"
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <ButtonContainer>
            <Button 
              onClick={() => handleSubmit(new Event('submit') as any)} 
              disabled={!isValid || isLoading}
            >
              {isLoading ? '게임 시작 중...' : '게임 시작'}
            </Button>
          </ButtonContainer>
        </Form>
      </Container>
    </PageContainer>
  );
};

export default MainPage; 