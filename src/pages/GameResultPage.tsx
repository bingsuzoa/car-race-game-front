import { useEffect, useState } from 'react';
import styled from 'styled-components';
import type { GameResponse } from '../api/gameApi';
import { useLocation } from 'react-router-dom';

const PageContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  overflow: hidden;
`;

const RaceTrack = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
`;

const TrackLine = styled.div<{ index: number }>`
  position: relative;
  flex: 1;
  border-bottom: 2px dashed #dee2e6;
  display: flex;
  align-items: center;
  background: ${props => props.index % 2 === 0 ? '#fff' : '#f8f9fa'};
`;

const StartLine = styled.div`
  position: absolute;
  left: 50px;
  top: 0;
  bottom: 0;
  width: 4px;
  background: #ff6b6b;
  z-index: 2;

  &::before {
    content: '출발';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-90deg);
    color: #ff6b6b;
    font-family: 'Gaegu', cursive;
    font-size: 1.2rem;
    font-weight: bold;
    white-space: nowrap;
  }
`;

const FinishLine = styled.div`
  position: absolute;
  right: 50px;
  top: 0;
  bottom: 0;
  width: 4px;
  background: #4ecdc4;
  z-index: 2;

  &::before {
    content: '결승';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-90deg);
    color: #4ecdc4;
    font-family: 'Gaegu', cursive;
    font-size: 1.2rem;
    font-weight: bold;
    white-space: nowrap;
  }
`;

const CarContainer = styled.div<{ index: number }>`
  position: absolute;
  left: 60px;
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 2;
  transition: left 0.3s ease-out;
`;

const CarName = styled.span`
  font-family: 'Gaegu', cursive;
  font-size: 1.2rem;
  color: #333;
  background: rgba(255, 255, 255, 0.9);
  padding: 4px 12px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CarImage = styled.div<{ color: string }>`
  width: 60px;
  height: 30px;
  background: ${props => props.color};
  border-radius: 8px;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &::before {
    content: '';
    position: absolute;
    width: 20px;
    height: 12px;
    background: #fff;
    border-radius: 4px;
    top: 6px;
    left: 6px;
    box-shadow: 30px 0 0 #fff;
  }

  &::after {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    background: #333;
    border-radius: 50%;
    bottom: -6px;
    left: 8px;
    box-shadow: 32px 0 0 #333;
  }
`;

const TrackNumber = styled.div`
  position: absolute;
  left: 20px;
  font-family: 'Gaegu', cursive;
  font-size: 1.2rem;
  color: #666;
  z-index: 1;
`;

// 자동차 색상 배열
const carColors = ['#FF6B6B', '#4ECDC4', '#FFD93D', '#95E1D3', '#FF8B94', '#6C5CE7'];

const GameResultPage = () => {
  const [gameData, setGameData] = useState<GameResponse | null>(null);
  const location = useLocation();

  useEffect(() => {
    const state = location.state as { gameData: GameResponse } | null;
    if (state?.gameData) {
      console.log('Received game data:', state.gameData);
      setGameData(state.gameData);
    }
  }, [location]);

  if (!gameData) {
    return null;
  }

  return (
    <PageContainer>
      <RaceTrack>
        <StartLine />
        <FinishLine />
        {gameData.data.cars.cars.map((car, index) => (
          <TrackLine key={car.id} index={index}>
            <TrackNumber>{index + 1}</TrackNumber>
            <CarContainer index={index}>
              <CarName>{car.carName}</CarName>
              <CarImage color={carColors[index % carColors.length]} />
            </CarContainer>
          </TrackLine>
        ))}
      </RaceTrack>
    </PageContainer>
  );
};

export default GameResultPage; 