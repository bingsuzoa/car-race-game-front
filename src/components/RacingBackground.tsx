import styled, { keyframes } from 'styled-components';

// 구름 이동 애니메이션
const moveCloud = keyframes`
  0% { transform: translateX(110vw); }
  100% { transform: translateX(-30vw); }
`;

// 자동차(토끼+당근) 이동 애니메이션
const moveCar = keyframes`
  0% { left: -180px; }
  100% { left: 100vw; }
`;

const Bg = styled.div`
  position: fixed;
  inset: 0;
  background: #cbeefd;
  overflow: hidden;
  z-index: 0;
`;

const Hill = styled.div<{ color: string; bottom: number; height: number; skew: number }>`
  position: absolute;
  left: 0;
  right: 0;
  height: ${props => props.height}vh;
  bottom: ${props => props.bottom}vh;
  background: ${props => props.color};
  border-radius: 0 0 60vw 60vw / 0 0 30vw 30vw;
  transform: skewY(${props => props.skew}deg);
`;

// SVG로 귀여운 집
const CuteHouse = ({ left, bottom }: { left: string; bottom: string }) => (
  <div style={{ position: 'absolute', left, bottom, width: 110, height: 110, zIndex: 2 }}>
    <svg width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 그림자/잔디 */}
      <ellipse cx="55" cy="105" rx="48" ry="7" fill="#aee571" />
      {/* 본체 */}
      <rect x="20" y="40" width="70" height="50" rx="8" fill="#fff6e9" stroke="#e0bfae" strokeWidth="3" />
      {/* 지붕 */}
      <polygon points="15,45 55,15 95,45" fill="#e5735c" stroke="#b84a39" strokeWidth="4" />
      {/* 벽면 그림자 */}
      <rect x="20" y="65" width="70" height="25" rx="8" fill="#f7e2c6" opacity="0.5" />
      {/* 문 */}
      <rect x="30" y="65" width="18" height="25" rx="4" fill="#e0a15c" stroke="#b87d3a" strokeWidth="2" />
      <rect x="44" y="78" width="2.5" height="7" rx="1.2" fill="#b87d3a" />
      {/* 네모 창문 */}
      <rect x="55" y="60" width="28" height="18" rx="4" fill="#b3e5fc" stroke="#7ec6e6" strokeWidth="2" />
      <rect x="55" y="60" width="28" height="18" rx="4" fill="url(#glass)" opacity="0.3" />
      {/* 원형 창문 (지붕 삼각형 내부 중앙, 더 위로) */}
      <circle cx="55" cy="28" r="8" fill="#b3e5fc" stroke="#e0a15c" strokeWidth="2.5" />
      <circle cx="55" cy="28" r="8" fill="url(#glass)" opacity="0.3" />
      <defs>
        <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="#b3e5fc" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const Tree = styled.div<{ left: string; bottom: string; }>`
    position: absolute;
  left: ${props => props.left};
  bottom: ${props => props.bottom};
  z-index: 2;
  transform: rotate(180deg);
  & .trunk {
    width: 10px;
    height: 30px;
    background: #a67c52;
    border-radius: 5px;
    margin: 0 auto;
  }
  & .leaves {
    width: 36px;
    height: 36px;
    background: #388e3c;
    border-radius: 50%;
    margin: -18px auto 0 auto;
    box-shadow: -10px 0 #388e3c, 10px 0 #388e3c;
  }
`;

const Sun = styled.div`
  position: absolute;
  right: 7vw;
  top: 5vh;
  width: 70px;
  height: 70px;
  background: radial-gradient(circle at 60% 40%, #fffde4 0%, #ffe066 60%, #ffd23f 100%);
  border-radius: 50%;
  box-shadow: 0 0 0 8px #ffe06677;
  border: 3px solid #ffd23f;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Cloud = styled.div<{ delay: number; top: number; size: number }>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size * 0.5}px;
  background: #fff;
  border-radius: ${props => props.size}px;
  top: ${props => props.top}vh;
  left: -200px;
  animation: ${moveCloud} 38s linear infinite;
  animation-delay: ${props => props.delay}s;
  opacity: 0.9;
  z-index: 4;
  &::before, &::after {
    content: '';
    position: absolute;
    background: #fff;
    border-radius: 50%;
    opacity: 0.9;
  }
  &::before {
    width: ${props => props.size * 0.6}px;
    height: ${props => props.size * 0.6}px;
    top: -${props => props.size * 0.25}px;
    left: ${props => props.size * 0.18}px;
  }
  &::after {
    width: ${props => props.size * 0.4}px;
    height: ${props => props.size * 0.4}px;
    top: -${props => props.size * 0.18}px;
    right: ${props => props.size * 0.18}px;
  }
`;

// SVG로 토끼+당근 자동차
const CarrotCar = () => (
  <svg width="180" height="90" viewBox="0 0 180 90" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* 당근 바디 */}
    <ellipse cx="90" cy="60" rx="70" ry="30" fill="#ffb347" stroke="#e67e22" strokeWidth="4" />
    {/* 당근 점 */}
    <ellipse cx="60" cy="60" rx="6" ry="3" fill="#fff6d6" />
    <ellipse cx="90" cy="75" rx="6" ry="3" fill="#fff6d6" />
    <ellipse cx="120" cy="60" rx="6" ry="3" fill="#fff6d6" />
    {/* 바퀴 */}
    <circle cx="50" cy="88" r="13" fill="#222" stroke="#888" strokeWidth="4" />
    <circle cx="130" cy="88" r="13" fill="#222" stroke="#888" strokeWidth="4" />
    {/* 바퀴살 */}
    <circle cx="50" cy="88" r="5" fill="#fff6d6" />
    <circle cx="130" cy="88" r="5" fill="#fff6d6" />
    {/* 당근 잎사귀 */}
    <ellipse cx="20" cy="50" rx="12" ry="22" fill="#aee571" stroke="#7bb661" strokeWidth="3" />
    <ellipse cx="30" cy="40" rx="7" ry="15" fill="#aee571" stroke="#7bb661" strokeWidth="2" />
    {/* 토끼 몸통 */}
    <ellipse cx="90" cy="40" rx="18" ry="18" fill="#fff" stroke="#e0e0e0" strokeWidth="2" />
    {/* 토끼 귀 */}
    <ellipse cx="80" cy="18" rx="6" ry="16" fill="#fff" stroke="#e0e0e0" strokeWidth="2" />
    <ellipse cx="100" cy="18" rx="6" ry="16" fill="#fff" stroke="#e0e0e0" strokeWidth="2" />
    {/* 토끼 얼굴 */}
    <ellipse cx="90" cy="38" rx="10" ry="10" fill="#fff" stroke="#e0e0e0" strokeWidth="2" />
    {/* 토끼 눈 */}
    <ellipse cx="86" cy="38" rx="1.5" ry="2" fill="#222" />
    <ellipse cx="94" cy="38" rx="1.5" ry="2" fill="#222" />
    {/* 토끼 코 */}
    <ellipse cx="90" cy="42" rx="1.5" ry="1" fill="#e67e22" />
    {/* 토끼 입 */}
    <path d="M89 44 Q90 46 91 44" stroke="#e67e22" strokeWidth="1.5" fill="none" />
    {/* 토끼 팔 */}
    <rect x="87" y="50" width="3" height="12" rx="2" fill="#fff" stroke="#e0e0e0" strokeWidth="1" />
    <rect x="90" y="50" width="3" height="12" rx="2" fill="#fff" stroke="#e0e0e0" strokeWidth="1" />
    {/* 당근 핸들 */}
    <rect x="92" y="60" width="10" height="3" rx="1.5" fill="#e67e22" />
  </svg>
);

// SVG로 거북이+당근 자동차
const CarrotCarTurtle = () => (
  <svg width="180" height="90" viewBox="0 0 180 90" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* 당근 바디 */}
    <ellipse cx="90" cy="60" rx="70" ry="30" fill="#ffb347" stroke="#e67e22" strokeWidth="4" />
    {/* 당근 점 */}
    <ellipse cx="60" cy="60" rx="6" ry="3" fill="#fff6d6" />
    <ellipse cx="90" cy="75" rx="6" ry="3" fill="#fff6d6" />
    <ellipse cx="120" cy="60" rx="6" ry="3" fill="#fff6d6" />
    {/* 바퀴 */}
    <circle cx="50" cy="88" r="13" fill="#222" stroke="#888" strokeWidth="4" />
    <circle cx="130" cy="88" r="13" fill="#222" stroke="#888" strokeWidth="4" />
    {/* 바퀴살 */}
    <circle cx="50" cy="88" r="5" fill="#fff6d6" />
    <circle cx="130" cy="88" r="5" fill="#fff6d6" />
    {/* 당근 잎사귀 */}
    <ellipse cx="20" cy="50" rx="12" ry="22" fill="#aee571" stroke="#7bb661" strokeWidth="3" />
    <ellipse cx="30" cy="40" rx="7" ry="15" fill="#aee571" stroke="#7bb661" strokeWidth="2" />
    {/* 거북이 몸통 */}
    <ellipse cx="90" cy="45" rx="16" ry="13" fill="#7ed957" stroke="#5eac36" strokeWidth="2" />
    {/* 거북이 등껍질 */}
    <ellipse cx="90" cy="43" rx="12" ry="9" fill="#5eac36" stroke="#4e8c2b" strokeWidth="1.5" />
    {/* 거북이 머리 */}
    <ellipse cx="105" cy="45" rx="7" ry="7" fill="#7ed957" stroke="#5eac36" strokeWidth="2" />
    {/* 거북이 눈 */}
    <ellipse cx="108" cy="45" rx="1.2" ry="1.5" fill="#222" />
    {/* 거북이 입 */}
    <path d="M107 48 Q108 49 109 48" stroke="#4e8c2b" strokeWidth="1" fill="none" />
    {/* 거북이 다리 */}
    <ellipse cx="82" cy="58" rx="3" ry="5" fill="#7ed957" stroke="#5eac36" strokeWidth="1" />
    <ellipse cx="98" cy="58" rx="3" ry="5" fill="#7ed957" stroke="#5eac36" strokeWidth="1" />
    {/* 당근 핸들 */}
    <rect x="92" y="60" width="10" height="3" rx="1.5" fill="#e67e22" />
  </svg>
);

const CarrotCarWrapper = styled.div<{ delay?: number }>`
  position: absolute;
  bottom: 4vh;
  left: -180px;
  z-index: 10;
  animation: ${moveCar} 12s linear infinite;
  animation-delay: ${props => props.delay || 0}s;
`;

// 자연스러운 곡선 들판 (SVG 활용)
const Fields = styled.svg`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 80vh;
  z-index: 1;
  pointer-events: none;
`;

// 머리카락 스타일들
const Hair1 = () => <ellipse cx="19" cy="13" rx="10" ry="5" fill="#a67c52" />; // 단발
const Hair2 = () => <rect x="8" y="8" width="22" height="8" rx="4" fill="#4ecdc4" />; // 뾰족
const Hair3 = () => <ellipse cx="19" cy="13" rx="11" ry="6" fill="#ffb347" />; // 곱슬
const Hair4 = () => <ellipse cx="19" cy="13" rx="8" ry="4" fill="#6c5ce7" />; // 짧은

// 표정들
const Smile = () => <path d="M16 27 Q19 30 22 27" stroke="#e5735c" strokeWidth="1.2" fill="none" />;
const VSmile = () => <path d="M15 26 Q19 34 23 26" stroke="#4ecdc4" strokeWidth="1.2" fill="none" />;
const CatFace = () => <text x="10" y="29" fontSize="10" fill="#e5735c">&gt;&lt;</text>; // >_<
const Happy = () => <path d="M15 27 Q19 25 23 27" stroke="#e5735c" strokeWidth="1.2" fill="none" />;
const Owo = () => <ellipse cx="19" cy="27" rx="3.5" ry="2.2" fill="#fff" stroke="#e5735c" strokeWidth="1" />;

// 옷 스타일
const Shirt = ({ color }: { color: string }) => <ellipse cx="19" cy="54" rx="10" ry="6" fill={color} />;
const Pants = ({ color }: { color: string }) => <rect x="13" y="60" width="12" height="6" rx="2.5" fill={color} />;

// 랜덤 유틸
const hairList = [Hair1, Hair2, Hair3, Hair4];
const faceList = [Smile, VSmile, CatFace, Happy, Owo];
const shirtColors = ['#90caf9', '#ffd93d', '#ffb347', '#aee571', '#4ecdc4', '#ff6b6b'];
const pantsColors = ['#bdbdbd', '#4ecdc4', '#ffd93d', '#6c5ce7', '#aee571'];

function getRandom(arr: any[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 머리, 표정, 옷 랜덤 적용된 사람
const FancyPerson = ({ left, bottom }: { left: string; bottom: string }) => {
  const Hair = getRandom(hairList);
  const Face = getRandom(faceList);
  const shirt = getRandom(shirtColors);
  const pants = getRandom(pantsColors);
  return (
    <div style={{ position: 'absolute', left, bottom, zIndex: 5, width: 38, height: 68 }}>
      <svg width="38" height="68" viewBox="0 0 38 68" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 다리 */}
        <rect x="13" y="60" width="3" height="8" rx="1.2" fill="#ffe0b2" />
        <rect x="22" y="60" width="3" height="8" rx="1.2" fill="#ffe0b2" />
        {/* 바지 */}
        <Pants color={pants} />
        {/* 몸통 */}
        <ellipse cx="19" cy="40" rx="13" ry="16" fill="#ffe0b2" />
        {/* 옷 */}
        <Shirt color={shirt} />
        {/* 얼굴 */}
        <ellipse cx="19" cy="22" rx="11" ry="11" fill="#ffe0b2" stroke="#e0bfae" strokeWidth="1.5" />
        {/* 머리카락 */}
        <Hair />
        {/* 눈 */}
        <ellipse cx="15" cy="22" rx="1.2" ry="1.5" fill="#222" />
        <ellipse cx="23" cy="22" rx="1.2" ry="1.5" fill="#222" />
        {/* 표정 */}
        <Face />
        {/* 손 */}
        <ellipse cx="6" cy="32" rx="3" ry="5" fill="#ffe0b2" />
        <ellipse cx="32" cy="32" rx="3" ry="5" fill="#ffe0b2" />
      </svg>
    </div>
  );
};

// 깃발 흔드는 사람
const FlagPerson = ({ left, bottom, flagColor = '#ffd93d', delay = 0 }: { left: string; bottom: string; flagColor?: string; delay?: number }) => (
  <div style={{ position: 'absolute', left, bottom, zIndex: 5, width: 38, height: 68 }}>
    <svg width="38" height="68" viewBox="0 0 38 68" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 다리 */}
      <rect x="13" y="60" width="3" height="8" rx="1.2" fill="#ffe0b2" />
      <rect x="22" y="60" width="3" height="8" rx="1.2" fill="#ffe0b2" />
      {/* 몸통 */}
      <ellipse cx="19" cy="40" rx="13" ry="16" fill="#ffe0b2" />
      {/* 얼굴 */}
      <ellipse cx="19" cy="22" rx="11" ry="11" fill="#ffe0b2" stroke="#e0bfae" strokeWidth="1.5" />
      {/* 눈 */}
      <ellipse cx="15" cy="22" rx="1.2" ry="1.5" fill="#222" />
      <ellipse cx="23" cy="22" rx="1.2" ry="1.5" fill="#222" />
      {/* 입 */}
      <path d="M16 27 Q19 30 22 27" stroke="#e5735c" strokeWidth="1.2" fill="none" />
      {/* 왼손(깃대) */}
      <rect x="6" y="32" width="3" height="18" rx="1.2" fill="#b87d3a" />
      {/* 깃발 (흔들기) */}
      <g style={{ transformOrigin: '7.5px 32px', animation: `flagWave 1.1s ${delay}s infinite alternate` }}>
        <rect x="2" y="32" width="10" height="8" rx="2" fill={flagColor} stroke="#e0bfae" strokeWidth="1" />
      </g>
      {/* waving flag animation keyframes */}
      <style>{`
        @keyframes flagWave {
          0% { transform: rotate(-10deg); }
          100% { transform: rotate(18deg); }
        }
      `}</style>
      {/* 오른손 */}
      <ellipse cx="32" cy="32" rx="3" ry="5" fill="#ffe0b2" />
      {/* 옷 */}
      <ellipse cx="19" cy="54" rx="10" ry="6" fill="#ffb347" />
    </svg>
  </div>
);

// 귀엽고 디테일한 망원경 보는 사람
const CuteTelescopePerson = ({ left, bottom }: { left: string; bottom: string }) => (
  <div style={{ position: 'absolute', left, bottom, zIndex: 6, width: 54, height: 74 }}>
    <svg width="54" height="74" viewBox="0 0 54 74" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 다리 */}
      <rect x="20" y="62" width="4" height="10" rx="1.5" fill="#ffe0b2" />
      <rect x="28" y="62" width="4" height="10" rx="1.5" fill="#ffe0b2" />
      {/* 바지 */}
      <rect x="20" y="68" width="12" height="6" rx="2.5" fill="#bdbdbd" />
      {/* 몸통 */}
      <ellipse cx="27" cy="46" rx="15" ry="18" fill="#ffe0b2" />
      {/* 옷 */}
      <ellipse cx="27" cy="60" rx="12" ry="7" fill="#ffd93d" />
      {/* 얼굴 */}
      <ellipse cx="27" cy="28" rx="13" ry="13" fill="#ffe0b2" stroke="#e0bfae" strokeWidth="1.5" />
      {/* 머리카락 */}
      <ellipse cx="27" cy="17" rx="11" ry="6" fill="#4ecdc4" />
      {/* 눈(한쪽만) */}
      <ellipse cx="23" cy="28" rx="1.5" ry="2" fill="#222" />
      {/* 입 */}
      <path d="M24 34 Q27 36 30 34" stroke="#e5735c" strokeWidth="1.2" fill="none" />
      {/* 손(망원경 잡는) */}
      <ellipse cx="44" cy="36" rx="3.5" ry="6" fill="#ffe0b2" />
      {/* 망원경 (귀엽고 컬러풀, 렌즈 강조, 각도 위로) */}
      <g style={{ transform: 'rotate(-18deg)', transformOrigin: '44px 36px', animation: 'telescopeMove 2.2s infinite alternate' }}>
        {/* 망원경 몸체 */}
        <rect x="44" y="32" width="16" height="7" rx="3.5" fill="#90caf9" stroke="#4ecdc4" strokeWidth="2" />
        {/* 망원경 끝(렌즈) */}
        <ellipse cx="60" cy="35.5" rx="4.5" ry="5" fill="#b3e5fc" stroke="#4ecdc4" strokeWidth="2" />
        {/* 렌즈 반짝임 */}
        <ellipse cx="62" cy="34" rx="1.2" ry="1.8" fill="#fff" opacity="0.7" />
        {/* 별/스파클 */}
        <polygon points="64,32 65,35 68,35 65.5,37 66.5,40 64,38.5 61.5,40 62.5,37 60,35 63,35" fill="#fffde4" opacity="0.8" />
      </g>
      <style>{`
        @keyframes telescopeMove {
          0% { transform: rotate(-18deg); }
          100% { transform: rotate(5deg); }
        }
      `}</style>
    </svg>
  </div>
);

// 꽃 SVG들
const Tulip = ({ left, bottom }: { left: string; bottom: string }) => (
  <div style={{ position: 'absolute', left, bottom, zIndex: 4, width: 24, height: 38 }}>
    <svg width="24" height="38" viewBox="0 0 24 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="18" width="4" height="16" rx="2" fill="#6cbe47" />
      <ellipse cx="12" cy="18" rx="7" ry="8" fill="#ff6b6b" />
      <path d="M5 18 Q8 10 12 18 Q16 10 19 18" stroke="#ff6b6b" strokeWidth="2" fill="none" />
    </svg>
  </div>
);
const Sunflower = ({ left, bottom }: { left: string; bottom: string }) => (
  <div style={{ position: 'absolute', left, bottom, zIndex: 4, width: 26, height: 38 }}>
    <svg width="26" height="38" viewBox="0 0 26 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="11" y="18" width="4" height="16" rx="2" fill="#7bb661" />
      <circle cx="13" cy="18" r="7" fill="#ffd93d" />
      <circle cx="13" cy="18" r="4" fill="#a67c52" />
      <g>
        {[...Array(8)].map((_, i) => (
          <ellipse key={i} cx="13" cy="18" rx="10" ry="3" fill="#ffd93d" transform={`rotate(${i*45} 13 18)`} />
        ))}
      </g>
    </svg>
  </div>
);
const Rose = ({ left, bottom }: { left: string; bottom: string }) => (
  <div style={{ position: 'absolute', left, bottom, zIndex: 4, width: 22, height: 36 }}>
    <svg width="22" height="36" viewBox="0 0 22 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="9" y="18" width="4" height="14" rx="2" fill="#388e3c" />
      <ellipse cx="11" cy="18" rx="6" ry="7" fill="#e57398" />
      <path d="M7 18 Q11 10 15 18" stroke="#e57398" strokeWidth="2" fill="none" />
      <ellipse cx="11" cy="13" rx="2" ry="1.5" fill="#fff" opacity="0.5" />
    </svg>
  </div>
);
const Daisy = ({ left, bottom }: { left: string; bottom: string }) => (
  <div style={{ position: 'absolute', left, bottom, zIndex: 4, width: 22, height: 36 }}>
    <svg width="22" height="36" viewBox="0 0 22 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="9" y="18" width="4" height="14" rx="2" fill="#7bb661" />
      <circle cx="11" cy="18" r="5" fill="#fff" />
      <circle cx="11" cy="18" r="2.5" fill="#ffd93d" />
      <g>
        {[...Array(8)].map((_, i) => (
          <ellipse key={i} cx="11" cy="18" rx="7" ry="2" fill="#fff" transform={`rotate(${i*45} 11 18)`} />
        ))}
      </g>
    </svg>
  </div>
);
const Bluebell = ({ left, bottom }: { left: string; bottom: string }) => (
  <div style={{ position: 'absolute', left, bottom, zIndex: 4, width: 20, height: 34 }}>
    <svg width="20" height="34" viewBox="0 0 20 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="16" width="4" height="14" rx="2" fill="#388e3c" />
      <ellipse cx="10" cy="16" rx="6" ry="6" fill="#90caf9" />
      <ellipse cx="10" cy="13" rx="2" ry="1.5" fill="#fff" opacity="0.5" />
    </svg>
  </div>
);
const Lavender = ({ left, bottom }: { left: string; bottom: string }) => (
  <div style={{ position: 'absolute', left, bottom, zIndex: 4, width: 18, height: 32 }}>
    <svg width="18" height="32" viewBox="0 0 18 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="7" y="14" width="4" height="14" rx="2" fill="#7bb661" />
      <ellipse cx="9" cy="14" rx="5" ry="5" fill="#b39ddb" />
      <ellipse cx="9" cy="11" rx="2" ry="1.5" fill="#fff" opacity="0.5" />
    </svg>
  </div>
);

// 추가 나무 스타일
const PineTree = ({ left, bottom }: { left: string; bottom: string }) => (
  <div style={{ position: 'absolute', left, bottom, zIndex: 2, width: 36, height: 60 }}>
    <svg width="36" height="60" viewBox="0 0 36 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="44" width="6" height="16" rx="3" fill="#a67c52" />
      <polygon points="18,6 6,44 30,44" fill="#388e3c" />
      <polygon points="18,16 10,38 26,38" fill="#4ecdc4" />
    </svg>
  </div>
);
const SmallTree = ({ left, bottom }: { left: string; bottom: string }) => (
  <div style={{ position: 'absolute', left, bottom, zIndex: 2, width: 28, height: 40 }}>
    <svg width="28" height="40" viewBox="0 0 28 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="11" y="28" width="6" height="12" rx="3" fill="#a67c52" />
      <ellipse cx="14" cy="24" rx="12" ry="12" fill="#388e3c" />
    </svg>
  </div>
);

const RacingBackground = () => (
  <Bg>
    {/* 자연스러운 들판 (곡선 SVG) */}
    <Fields viewBox="0 0 1920 900" preserveAspectRatio="none">
      <defs>
        <linearGradient id="field1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d6f5b0" />
          <stop offset="100%" stopColor="#b7e28a" />
        </linearGradient>
        <linearGradient id="field2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#aee571" />
          <stop offset="100%" stopColor="#b7e28a" />
        </linearGradient>
        <linearGradient id="field3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b7e28a" />
          <stop offset="100%" stopColor="#aee571" />
        </linearGradient>
      </defs>
      {/* 가장 뒤 언덕 */}
      <path d="M0 250 Q 400 120 900 320 T 1920 250 V900 H0Z" fill="url(#field1)" />
      {/* 중간 언덕 */}
      <path d="M0 400 Q 600 220 1200 470 T 1920 400 V900 H0Z" fill="url(#field2)" />
      {/* 앞쪽 들판 */}
      <path d="M0 700 Q 700 500 1500 700 T 1920 700 V900 H0Z" fill="url(#field3)" />
    </Fields>
    {/* 집 (SVG) */}
    <CuteHouse left="7vw" bottom="18vh" />
    <CuteHouse left="80vw" bottom="22vh" />
    {/* 나무 */}
    <Tree left="20vw" bottom="20vh">
      <div className="trunk" />
      <div className="leaves" />
    </Tree>
    <Tree left="60vw" bottom="25vh">
      <div className="trunk" />
      <div className="leaves" />
    </Tree>
    <Tree left="45vw" bottom="18vh">
      <div className="trunk" />
      <div className="leaves" />
    </Tree>
    {/* 해 */}
    <Sun />
    {/* 구름 */}
    <Cloud delay={0} top={8} size={120} />
    <Cloud delay={8} top={18} size={90} />
    <Cloud delay={16} top={28} size={140} />
    <Cloud delay={24} top={38} size={100} />
    {/* 귀여운 응원 사람들 (집, 폼과 겹치지 않게 들판 아래쪽에 배치, 다양한 스타일) */}
    <FancyPerson left="14vw" bottom="10vh" />
    <FancyPerson left="20vw" bottom="8vh" />
    <FancyPerson left="26vw" bottom="12vh" />
    <FancyPerson left="32vw" bottom="7vh" />
    <FancyPerson left="38vw" bottom="13vh" />
    <FancyPerson left="44vw" bottom="9vh" />
    <FancyPerson left="50vw" bottom="11vh" />
    <FancyPerson left="56vw" bottom="8vh" />
    <FancyPerson left="62vw" bottom="14vh" />
    <FancyPerson left="68vw" bottom="10vh" />
    <FlagPerson left="24vw" bottom="7vh" flagColor="#ffd93d" delay={0.2} />
    <FlagPerson left="48vw" bottom="6vh" flagColor="#4ecdc4" delay={0.5} />
    <FlagPerson left="72vw" bottom="8vh" flagColor="#ffb347" delay={0.1} />
    {/* 움직이는 토끼+당근 자동차 */}
    <CarrotCarWrapper>
      <CarrotCar />
    </CarrotCarWrapper>
    {/* 움직이는 거북이+당근 자동차 (토끼보다 뒤에서 출발) */}
    <CarrotCarWrapper delay={3}>
      <CarrotCarTurtle />
    </CarrotCarWrapper>
    {/* 우측 위쪽에 집 추가 */}
    <CuteHouse left="18vw" bottom="36vh" />
    {/* 집 옆에서 귀엽고 디테일한 망원경으로 경주 구경하는 사람 */}
    <CuteTelescopePerson left="24vw" bottom="37vh" />
    {/* 집 왼쪽에 꽃 추가 */}
    <Daisy left="15vw" bottom="36vh" />
    {/* 꽃들 */}
    <Tulip left="10vw" bottom="6vh" />
    <Sunflower left="18vw" bottom="5vh" />
    <Rose left="27vw" bottom="8vh" />
    <Daisy left="40vw" bottom="7vh" />
    <Bluebell left="60vw" bottom="6vh" />
    <Lavender left="80vw" bottom="8vh" />
    {/* 추가 나무들 */}
    <SmallTree left="75vw" bottom="12vh" />
  </Bg>
);

export default RacingBackground; 