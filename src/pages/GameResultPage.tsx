import { useEffect, useState } from 'react';
import styled from 'styled-components';
import type { GameResponse } from '../api/gameApi';
import { useLocation, useNavigate } from 'react-router-dom';
import React from 'react';

const PageContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, #0a0033 0%, #1a1446 100%);
  overflow: hidden;
`;

// SVG 레이싱카 (이름 표시)
const RacingCar = ({ x, y, color, name }: { x: number; y: number; color: string; name: string }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* 바퀴 */}
    <ellipse cx="32" cy="38" rx="12" ry="12" fill="#222" stroke="#888" strokeWidth="3" />
    <ellipse cx="108" cy="38" rx="12" ry="12" fill="#222" stroke="#888" strokeWidth="3" />
    {/* 차체 */}
    <rect x="20" y="18" width="90" height="22" rx="10" fill={color} stroke="#333" strokeWidth="2" />
    {/* 스포일러 */}
    <rect x="10" y="18" width="10" height="10" rx="2" fill="#444" stroke="#222" strokeWidth="1" />
    {/* 라이트 */}
    <ellipse cx="110" cy="28" rx="4" ry="3" fill="#ffd93d" stroke="#333" strokeWidth="1" />
    {/* 데칼 */}
    <polygon points="35,30 80,22 100,38 35,38" fill="#fff59d" opacity="0.7" />
    {/* 자동차 이름 */}
    <text x="65" y="33" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#222" stroke="#fff" strokeWidth="0.8" paintOrder="stroke" style={{fontFamily: 'sans-serif', letterSpacing: '0.5px'}}>{name}</text>
  </g>
);

// SVG 나무
const Tree = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x},${y})`}>
    <rect x="18" y="40" width="8" height="24" rx="4" fill="#a67c52" />
    <ellipse cx="22" cy="38" rx="22" ry="18" fill="#388e3c" />
    <ellipse cx="36" cy="48" rx="12" ry="10" fill="#388e3c" />
    <ellipse cx="10" cy="48" rx="10" ry="8" fill="#388e3c" />
  </g>
);

// SVG 깃발
const Flag = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x},${y})`}>
    <rect x="0" y="0" width="3" height="32" fill="#fff" />
    <rect x="18" y="0" width="3" height="32" fill="#fff" />
    <g>
      {[...Array(5)].map((_, row) =>
        [...Array(5)].map((_, col) => (
          <rect
            key={row + '-' + col}
            x={3 + col * 3.2}
            y={row * 3.2}
            width="3.2"
            height="3.2"
            fill={(row + col) % 2 === 0 ? '#222' : '#fff'}
          />
        ))
      )}
    </g>
  </g>
);

// SVG 펜스
const Fence = () => (
  <g>
    <rect x="0" y="260" width="900" height="30" fill="#4ecdc4" />
    <g>
      {[...Array(18)].map((_, i) => (
        <polygon key={i} points={`${i*50},260 ${i*50+25},250 ${i*50+50},260`} fill="#b2ebf2" />
      ))}
    </g>
    <g>
      {[...Array(18)].map((_, i) => (
        <polygon key={i} points={`${i*50+25},290 ${i*50+50},260 ${i*50+75},290`} fill="#b2ebf2" />
      ))}
    </g>
  </g>
);

const carColors = ['#FF6B6B', '#4ECDC4', '#FFD93D', '#95E1D3', '#FF8B94', '#6C5CE7'];

// 버튼 행(가로 정렬) 컨테이너
const ButtonRow = styled.div`
  position: absolute;
  left: 50%;
  bottom: 90px;
  transform: translateX(-50%);
  display: flex;
  gap: 24px;
  z-index: 10;
`;

// Play 버튼 스타일 (width/padding/font-size 동일)
const PlayButton = styled.button`
  background: linear-gradient(90deg, #ffd93d 60%, #ff6b6b 100%);
  color: #222;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  border-radius: 16px;
  padding: 14px 36px;
  min-width: 140px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.18);
  cursor: pointer;
  transition: background 0.1s, box-shadow 0.1s;
  &:hover {
    background: linear-gradient(90deg, #ffef8b 60%, #ff8b94 100%);
    box-shadow: 0 6px 24px rgba(0,0,0,0.22);
  }
`;

// 라운드/레이스 표시 스타일
const RoundInfo = styled.div`
  position: absolute;
  left: 50%;
  bottom: 36px;
  transform: translateX(-50%);
  color: #fffbe7;
  font-size: 1.3rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  background: rgba(20, 20, 40, 0.7);
  border-radius: 12px;
  padding: 10px 32px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.18);
`;

const GameResultPage = () => {
  const [gameData, setGameData] = useState<GameResponse | null>(null);
  const [isInitial, setIsInitial] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const state = location.state as { gameData: GameResponse } | null;
    if (state?.gameData) {
      setGameData(state.gameData);
      setIsInitial(true); // 페이지 진입 시 초기 상태
    }
  }, [location]);

  if (!gameData) return null;
  const cars = gameData.data.cars?.cars ?? [];
  const gameId = gameData.data.gameId;
  const race = gameData.data.race ?? 6;
  const round = gameData.data.round ?? 1;
  const TRACK_START_X = 130;
  const TRACK_END_X = 980;
  const trackLength = TRACK_END_X - TRACK_START_X;
  const carStartX = 20;

  // 트랙/차선 동적 계산 (트랙이 SVG 세로 중앙에 위치)
  const TRACK_HEIGHT = 60;
  const TRACK_GAP = 16;
  const laneCount = cars.length;
  const totalTrackHeight = laneCount * TRACK_HEIGHT + (laneCount - 1) * TRACK_GAP;
  const svgHeight = 500; // 전체 SVG 높이 고정
  const TRACK_TOP = (svgHeight - totalTrackHeight) / 2; // 중앙 정렬
  const startLineX = 130;

  const isEnd = gameData.data.isEnd;

  // Play 버튼 클릭 핸들러
  const handlePlay = async () => {
    try {
      const response = await fetch(`http://localhost:8080/games/${gameId}/play`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (data && data.data) {
        setGameData(data); // 응답 데이터로 갱신
        setIsInitial(false); // 이제 position/race로 이동
      }
    } catch (err) {
      console.error('Play API 호출 실패:', err);
    }
  };

  // 우승자 확인 버튼 클릭 핸들러
  const handleWinner = async () => {
    navigate(`/winners?id=${gameId}`);
  };

  return (
    <PageContainer>
      {/* 버튼 행(가로 정렬) */}
      <ButtonRow>
        <PlayButton onClick={isEnd ? handleWinner : handlePlay}>{isEnd ? '우승자 확인' : 'Play'}</PlayButton>
      </ButtonRow>
      {/* 라운드/레이스 정보 (Play 버튼 아래 중앙) */}
      <RoundInfo>
        현재 라운드 <b>{round}</b> / 총 레이스 <b>{race}</b>
      </RoundInfo>
      <svg width="100%" height={svgHeight} viewBox={`0 0 1000 ${svgHeight}`} style={{ position: 'absolute', inset: 0 }}>
        {/* 버튼 행(가로 정렬) */}
        <ButtonRow>
          <PlayButton onClick={isEnd ? handleWinner : handlePlay}>{isEnd ? '우승자 확인' : 'Play'}</PlayButton>
        </ButtonRow>
        {/* 버튼 행(가로 정렬) */}
        <ButtonRow>
          {isEnd && (
            <PlayButton onClick={() => { window.location.href = 'http://localhost:5173'; }}>다시 시작</PlayButton>
          )}
        </ButtonRow>
        {/* 라운드/레이스 정보 (Play 버튼 아래 중앙) */}
        <RoundInfo>
          현재 라운드 <b>{round}</b> / 총 레이스 <b>{race}</b>
        </RoundInfo>
        {/* 우주 배경: 별, 혹성, 은하, 유성, 로켓, UFO 등 */}
        <g>
          {/* 작은 별들 */}
          {[...Array(100)].map((_, i) => (
            <circle key={i} cx={Math.random()*1000} cy={Math.random()*svgHeight} r={Math.random()*1.5+0.3} fill="#fff" opacity={Math.random()*0.7+0.3} />
          ))}
          {/* 큰 별뭉치 */}
          <g>
            <circle cx="200" cy="100" r="3.5" fill="#fffbe7" opacity="0.8" />
            <circle cx="210" cy="110" r="2.2" fill="#fffbe7" opacity="0.6" />
            <circle cx="190" cy="110" r="1.8" fill="#fffbe7" opacity="0.5" />
          </g>
          {/* 은하 */}
          <ellipse cx="700" cy="400" rx="40" ry="12" fill="#b39ddb" opacity="0.25" />
          <ellipse cx="300" cy="60" rx="30" ry="8" fill="#90caf9" opacity="0.18" />
          {/* 다양한 행성 */}
          <g>
            {/* 토성 스타일 행성 */}
            <circle cx="120" cy="60" r="18" fill="#ffb300" opacity="0.7" />
            <ellipse cx="120" cy="60" rx="28" ry="6" fill="#fffde7" opacity="0.3" />
            {/* 파란 행성 */}
            <circle cx="900" cy="420" r="12" fill="#26c6da" opacity="0.7" />
            <ellipse cx="900" cy="420" rx="16" ry="4" fill="#fff" opacity="0.15" />
            {/* 보라 행성 */}
            <circle cx="800" cy="100" r="10" fill="#a084ee" opacity="0.7" />
            {/* 붉은 행성 */}
            <circle cx="600" cy="80" r="8" fill="#ff6b6b" opacity="0.7" />
            {/* 초록 행성 */}
            <circle cx="350" cy="420" r="14" fill="#81c784" opacity="0.7" />
          </g>
          {/* 유성 */}
          <g>
            <rect x="700" y="60" width="40" height="3" rx="2" fill="#fffde7" opacity="0.7" transform="rotate(-15 700 60)" />
            <circle cx="740" cy="61" r="4" fill="#fffde7" opacity="0.9" />
          </g>
          {/* 작은 로켓 */}
          <g transform="translate(150,350)">
            <rect x="0" y="-6" width="24" height="12" rx="6" fill="#fff" stroke="#bdbdbd" strokeWidth="1" />
            <polygon points="24,-6 34,0 24,6" fill="#ff6b6b" />
            <rect x="-6" y="-3" width="6" height="6" rx="2" fill="#90caf9" />
            <rect x="-10" y="-2" width="4" height="4" rx="1" fill="#ffd93d" />
          </g>
          {/* UFO */}
          <g transform="translate(600,200)">
            <ellipse cx="0" cy="0" rx="18" ry="6" fill="#b2ebf2" />
            <ellipse cx="0" cy="-3" rx="10" ry="4" fill="#fff" opacity="0.7" />
            <rect x="-8" y="-6" width="16" height="6" rx="3" fill="#6c5ce7" />
            <circle cx="-5" cy="-6" r="2" fill="#ffd93d" />
            <circle cx="5" cy="-6" r="2" fill="#ffd93d" />
          </g>
        </g>
        {/* 트랙 전체 배경 (중앙, 한 번에 이어진 도로) */}
        <rect
          x="0"
          y={TRACK_TOP}
          width="1000"
          height={totalTrackHeight}
          fill="#888"
          stroke="#bdbdbd"
          strokeWidth="4"
        />
        {/* 트랙 경계선 (위/아래 붉은 경계, 기존 개수) */}
        {[0, totalTrackHeight - 10].map((y, idx) => (
          <g key={idx}>
            <rect x="0" y={TRACK_TOP + y} width="1000" height="10" fill="#fff" />
            {[...Array(20)].map((_, i) => (
              <rect key={i} x={i*50} y={TRACK_TOP + y} width="25" height="10" fill="#e5735c" />
            ))}
          </g>
        ))}
        {/* 각 차선(점선, 기존 개수) */}
        {cars.map((_, i) => {
          if (i === 0) return null;
          const y = TRACK_TOP + i * (TRACK_HEIGHT + TRACK_GAP) - TRACK_GAP / 2;
          return (
            <line
              key={i}
              x1="0"
              x2="1000"
              y1={y}
              y2={y}
              stroke="#fff"
              strokeDasharray="20, 20"
              strokeWidth="3"
              opacity="0.7"
            />
          );
        })}
        {/* 도로 중앙선(점선, line으로) */}
        <line
          x1="0"
          x2="1000"
          y1={TRACK_TOP + totalTrackHeight/2}
          y2={TRACK_TOP + totalTrackHeight/2}
          stroke="#fff"
          strokeDasharray="30, 20"
          strokeWidth="4"
          opacity="0.5"
        />
        {/* 자동차들 (초기: 출발선 왼쪽, 이후: position/race 비율 이동) */}
        {cars.map((car, i) => {
          let x;
          if (isInitial) {
            x = carStartX;
          } else {
            // position이 0이면 출발선, position이 race면 트랙 맨 끝
            x = TRACK_START_X + (trackLength * (car.position ?? 0)) / race;
          }
          const y = TRACK_TOP + i * (TRACK_HEIGHT + TRACK_GAP) + TRACK_HEIGHT / 2 - 30;
          return (
            <RacingCar key={car.id} x={x} y={y} color={carColors[i % carColors.length]} name={car.carName} />
          );
        })}
        {/* 출발선 (가장자리부터 트랙 전체 높이) */}
        <rect x={startLineX} y={TRACK_TOP} width="8" height={totalTrackHeight} fill="#fff" stroke="#222" strokeWidth="2" />
        {/* 깃발은 트랙 위쪽 여백에 배치 (트랙 위에 X) */}
        <Flag x={40} y={TRACK_TOP - 40} />
        <Flag x={90} y={TRACK_TOP - 40} />
        {/* 펜스는 트랙 아래쪽에 고정 (Fence 컴포넌트 사용) */}
        <g transform={`translate(0,${TRACK_TOP + totalTrackHeight})`}>
          <Fence />
        </g>
      </svg>
    </PageContainer>
  );
};

export default GameResultPage; 