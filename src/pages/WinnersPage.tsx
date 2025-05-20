import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';

// 카레이서 SVG 컴포넌트 (기존 코드 유지)
const RacingDriver = ({ color, name, pose = 1 }: { color: string; name: string; pose?: number }) => {
  const poses = {
    1: (color: string) => (
      <g transform="translate(0, 0)">
        {/* 헬멧 - 더 디테일하게 */}
        <path d="M35,15 Q45,8 55,15 L60,30 Q60,42 55,48 L35,48 Q30,42 30,30 Z" fill={color} stroke="#333" strokeWidth="2" />
        {/* 헬멧 장식 */}
        <path d="M35,20 Q45,15 55,20 L55,35 Q45,40 35,35 Z" fill="#fff" opacity="0.2" />
        <path d="M40,25 L50,25 L48,30 L42,30 Z" fill="#fff" opacity="0.3" />
        {/* 바이저 */}
        <path d="M35,30 L55,30 L52,35 L38,35 Z" fill="#333" />
        <path d="M38,32 L52,32 L50,34 L40,34 Z" fill="#666" />
        {/* 목 보호대 */}
        <path d="M40,48 L50,48 L48,52 L42,52 Z" fill="#444" stroke="#333" strokeWidth="1" />
        {/* 레이싱 슈트 - 더 디테일하게 */}
        <path d="M30,48 L60,48 L55,85 L35,85 Z" fill={color} stroke="#333" strokeWidth="2" />
        {/* 슈트 장식 */}
        <path d="M35,55 L55,55 L53,65 L37,65 Z" fill="#fff" opacity="0.2" />
        <path d="M35,70 L55,70 L53,80 L37,80 Z" fill="#fff" opacity="0.2" />
        {/* 어깨 패드 */}
        <path d="M30,48 L35,48 L33,55 L30,55 Z" fill="#444" stroke="#333" strokeWidth="1" />
        <path d="M55,48 L60,48 L60,55 L57,55 Z" fill="#444" stroke="#333" strokeWidth="1" />
        {/* 팔 - 더 자연스럽게 */}
        <path d="M30,55 C25,60 22,65 25,70 L30,65 C28,62 30,58 35,55" fill={color} stroke="#333" strokeWidth="2" />
        <path d="M60,55 C65,60 68,65 65,70 L60,65 C62,62 60,58 55,55" fill={color} stroke="#333" strokeWidth="2" />
        {/* 승리 포즈 - 팔 들기 */}
        <path d="M60,55 C65,50 70,45 65,40 L60,45 C62,48 60,52 55,55" fill={color} stroke="#333" strokeWidth="2" />
        {/* 장갑 */}
        <path d="M25,70 C22,72 20,75 22,78 L25,75 C24,73 25,71 28,70" fill="#444" stroke="#333" strokeWidth="1" />
        <path d="M65,70 C68,72 70,75 68,78 L65,75 C66,73 65,71 62,70" fill="#444" stroke="#333" strokeWidth="1" />
        {/* 다리 - 더 자연스럽게 */}
        <path d="M35,85 C32,88 30,92 33,95 L38,90 C36,88 37,86 40,85" fill={color} stroke="#333" strokeWidth="2" />
        <path d="M55,85 C58,88 60,92 57,95 L52,90 C54,88 53,86 50,85" fill={color} stroke="#333" strokeWidth="2" />
        {/* 레이싱 부츠 */}
        <path d="M33,95 C30,97 28,100 31,102 L36,98 C34,97 35,96 38,95" fill="#444" stroke="#333" strokeWidth="1" />
        <path d="M57,95 C60,97 62,100 59,102 L54,98 C56,97 55,96 52,95" fill="#444" stroke="#333" strokeWidth="1" />
      </g>
    ),
    2: (color: string) => (
      <g transform="translate(0, 0)">
        {/* 헬멧 */}
        <path d="M35,15 Q45,8 55,15 L60,30 Q60,42 55,48 L35,48 Q30,42 30,30 Z" fill={color} stroke="#333" strokeWidth="2" />
        <path d="M35,20 Q45,15 55,20 L55,35 Q45,40 35,35 Z" fill="#fff" opacity="0.2" />
        <path d="M40,25 L50,25 L48,30 L42,30 Z" fill="#fff" opacity="0.3" />
        {/* 바이저 */}
        <path d="M35,30 L55,30 L52,35 L38,35 Z" fill="#333" />
        <path d="M38,32 L52,32 L50,34 L40,34 Z" fill="#666" />
        {/* 목 보호대 */}
        <path d="M40,48 L50,48 L48,52 L42,52 Z" fill="#444" stroke="#333" strokeWidth="1" />
        {/* 레이싱 슈트 */}
        <path d="M30,48 L60,48 L55,85 L35,85 Z" fill={color} stroke="#333" strokeWidth="2" />
        {/* 슈트 장식 */}
        <path d="M35,55 L55,55 L53,65 L37,65 Z" fill="#fff" opacity="0.2" />
        <path d="M35,70 L55,70 L53,80 L37,80 Z" fill="#fff" opacity="0.2" />
        {/* 어깨 패드 */}
        <path d="M30,48 L35,48 L33,55 L30,55 Z" fill="#444" stroke="#333" strokeWidth="1" />
        <path d="M55,48 L60,48 L60,55 L57,55 Z" fill="#444" stroke="#333" strokeWidth="1" />
        {/* 팔 */}
        <path d="M30,55 C25,60 22,65 25,70 L30,65 C28,62 30,58 35,55" fill={color} stroke="#333" strokeWidth="2" />
        <path d="M60,55 C65,60 68,65 65,70 L60,65 C62,62 60,58 55,55" fill={color} stroke="#333" strokeWidth="2" />
        {/* 승리 포즈 - 양손 들기 */}
        <path d="M30,55 C25,50 20,45 25,40 L30,45 C28,48 30,52 35,55" fill={color} stroke="#333" strokeWidth="2" />
        <path d="M60,55 C65,50 70,45 65,40 L60,45 C62,48 60,52 55,55" fill={color} stroke="#333" strokeWidth="2" />
        {/* 장갑 */}
        <path d="M25,70 C22,72 20,75 22,78 L25,75 C24,73 25,71 28,70" fill="#444" stroke="#333" strokeWidth="1" />
        <path d="M65,70 C68,72 70,75 68,78 L65,75 C66,73 65,71 62,70" fill="#444" stroke="#333" strokeWidth="1" />
        {/* 다리 */}
        <path d="M35,85 C32,88 30,92 33,95 L38,90 C36,88 37,86 40,85" fill={color} stroke="#333" strokeWidth="2" />
        <path d="M55,85 C58,88 60,92 57,95 L52,90 C54,88 53,86 50,85" fill={color} stroke="#333" strokeWidth="2" />
        {/* 레이싱 부츠 */}
        <path d="M33,95 C30,97 28,100 31,102 L36,98 C34,97 35,96 38,95" fill="#444" stroke="#333" strokeWidth="1" />
        <path d="M57,95 C60,97 62,100 59,102 L54,98 C56,97 55,96 52,95" fill="#444" stroke="#333" strokeWidth="1" />
      </g>
    ),
    3: (color: string) => (
      <g transform="translate(0, 0)">
        {/* 헬멧 */}
        <path d="M35,15 Q45,8 55,15 L60,30 Q60,42 55,48 L35,48 Q30,42 30,30 Z" fill={color} stroke="#333" strokeWidth="2" />
        <path d="M35,20 Q45,15 55,20 L55,35 Q45,40 35,35 Z" fill="#fff" opacity="0.2" />
        <path d="M40,25 L50,25 L48,30 L42,30 Z" fill="#fff" opacity="0.3" />
        {/* 바이저 */}
        <path d="M35,30 L55,30 L52,35 L38,35 Z" fill="#333" />
        <path d="M38,32 L52,32 L50,34 L40,34 Z" fill="#666" />
        {/* 목 보호대 */}
        <path d="M40,48 L50,48 L48,52 L42,52 Z" fill="#444" stroke="#333" strokeWidth="1" />
        {/* 레이싱 슈트 */}
        <path d="M30,48 L60,48 L55,85 L35,85 Z" fill={color} stroke="#333" strokeWidth="2" />
        {/* 슈트 장식 */}
        <path d="M35,55 L55,55 L53,65 L37,65 Z" fill="#fff" opacity="0.2" />
        <path d="M35,70 L55,70 L53,80 L37,80 Z" fill="#fff" opacity="0.2" />
        {/* 어깨 패드 */}
        <path d="M30,48 L35,48 L33,55 L30,55 Z" fill="#444" stroke="#333" strokeWidth="1" />
        <path d="M55,48 L60,48 L60,55 L57,55 Z" fill="#444" stroke="#333" strokeWidth="1" />
        {/* 팔 */}
        <path d="M30,55 C25,60 22,65 25,70 L30,65 C28,62 30,58 35,55" fill={color} stroke="#333" strokeWidth="2" />
        <path d="M60,55 C65,60 68,65 65,70 L60,65 C62,62 60,58 55,55" fill={color} stroke="#333" strokeWidth="2" />
        {/* 승리 포즈 - 트로피 들기 */}
        <path d="M60,55 C65,50 70,45 65,40 L60,45 C62,48 60,52 55,55" fill={color} stroke="#333" strokeWidth="2" />
        {/* 트로피 */}
        <path d="M65,40 L65,25 L70,20 L75,25 L75,40 Z" fill="#FFD700" stroke="#333" strokeWidth="2" />
        <path d="M68,25 L68,20 L72,20 L72,25 Z" fill="#FFD700" stroke="#333" strokeWidth="1" />
        <path d="M70,20 L70,15 L72,15 L72,20 Z" fill="#FFD700" stroke="#333" strokeWidth="1" />
        <circle cx="70" cy="32" r="4" fill="#FFD700" />
        <path d="M67,35 L73,35 L72,38 L68,38 Z" fill="#FFD700" stroke="#333" strokeWidth="1" />
        {/* 장갑 */}
        <path d="M25,70 C22,72 20,75 22,78 L25,75 C24,73 25,71 28,70" fill="#444" stroke="#333" strokeWidth="1" />
        <path d="M65,70 C68,72 70,75 68,78 L65,75 C66,73 65,71 62,70" fill="#444" stroke="#333" strokeWidth="1" />
        {/* 다리 */}
        <path d="M35,85 C32,88 30,92 33,95 L38,90 C36,88 37,86 40,85" fill={color} stroke="#333" strokeWidth="2" />
        <path d="M55,85 C58,88 60,92 57,95 L52,90 C54,88 53,86 50,85" fill={color} stroke="#333" strokeWidth="2" />
        {/* 레이싱 부츠 */}
        <path d="M33,95 C30,97 28,100 31,102 L36,98 C34,97 35,96 38,95" fill="#444" stroke="#333" strokeWidth="1" />
        <path d="M57,95 C60,97 62,100 59,102 L54,98 C56,97 55,96 52,95" fill="#444" stroke="#333" strokeWidth="1" />
      </g>
    )
  };

  return (
    <g>
      {poses[pose as keyof typeof poses](color)}
      <text x="45" y="110" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#fff" stroke="#333" strokeWidth="0.5" style={{fontFamily: 'sans-serif'}}>
        {name}
      </text>
    </g>
  );
};

const carColors = ['#FFD93D', '#b2ebf2', '#b39ddb', '#FF6B6B', '#4ECDC4', '#6C5CE7'];

export default function WinnersPage() {
  const [winners, setWinners] = useState<any[]>([]);
  const [searchParams] = useSearchParams();
  const gameId = searchParams.get('id');

  useEffect(() => {
    if (!gameId) return;
    fetch(`http://localhost:8080/games/${gameId}/winners`)
      .then(res => res.json())
      .then(data => {
        setWinners(data.data?.cars || []);
      });
  }, [gameId]);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-stage-gold-800 via-stage-gold-900 to-stage-gold-950 overflow-hidden">
      {/* 스포트라이트 */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="spotlight-beam"
          style={{ left: '15%', top: '-20%' }}
          animate={{ 
            rotate: [-15, 15, -15],
            scale: [1.1, 1.2, 1.1],
            opacity: [0.7, 0.9, 0.7]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="spotlight-beam"
          style={{ left: '35%', top: '-25%' }}
          animate={{ 
            rotate: [15, -15, 15],
            scale: [1.2, 1.1, 1.2],
            opacity: [0.8, 0.7, 0.8]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.div 
          className="spotlight-beam"
          style={{ left: '65%', top: '-20%' }}
          animate={{ 
            rotate: [-15, 15, -15],
            scale: [1.1, 1.2, 1.1],
            opacity: [0.7, 0.9, 0.7]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div 
          className="spotlight-beam"
          style={{ left: '85%', top: '-25%' }}
          animate={{ 
            rotate: [15, -15, 15],
            scale: [1.2, 1.1, 1.2],
            opacity: [0.8, 0.7, 0.8]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
      </div>

      {/* 메인 컨텐츠 */}
      <div className="relative h-full flex flex-col items-center justify-center">
        {/* 타이틀 */}
        <motion.h1 
          className="text-4xl font-bold text-white mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-stage-gold-300">🏆 우주 레이싱 우승자! 🏆</span>
        </motion.h1>

        {/* 시상대 */}
        <div className="relative">
          <div className="stage-platform">
            {/* 우승자 카레이서 */}
            <div className="absolute inset-0 flex items-center justify-center gap-16">
              {winners.map((car, idx) => (
                <motion.div
                  key={car.id}
                  className="relative"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: idx * 0.2 }}
                >
                  <motion.div
                    className="relative"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <svg width="120" height="140" viewBox="0 0 120 140" className="drop-shadow-lg">
                      <RacingDriver 
                        color={carColors[idx % carColors.length]} 
                        name={car.carName} 
                        pose={(idx % 3) + 1} 
                      />
                    </svg>
                    {/* 이름 아래 그림자 */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-black/20 blur-md rounded-full" />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* 다시 시작 버튼 */}
        <motion.button
          className="mt-16 px-8 py-4 bg-gradient-to-r from-stage-gold-400 to-stage-gold-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          onClick={() => { window.location.href = 'http://localhost:5173'; }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          다시 시작
        </motion.button>
      </div>
    </div>
  );
} 