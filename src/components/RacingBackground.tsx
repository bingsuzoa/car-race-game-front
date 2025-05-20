import styled, { keyframes } from 'styled-components';

const moveCar = keyframes`
  0% {
    transform: translateX(-100px);
  }
  100% {
    transform: translateX(calc(100vw + 100px));
  }
`;

const moveCloud = keyframes`
  0% {
    transform: translateX(100vw);
  }
  100% {
    transform: translateX(-100px);
  }
`;

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%);
  overflow: hidden;
  z-index: 0;
`;

const Car = styled.div<{ $delay: number; top: number; color: string; $isSports?: boolean }>`
  position: absolute;
  width: ${props => props.$isSports ? '60px' : '70px'};
  height: ${props => props.$isSports ? '30px' : '35px'};
  background: ${props => props.color};
  border-radius: ${props => props.$isSports ? '4px' : '8px'};
  top: ${props => props.top}%;
  left: -100px;
  animation: moveCar 8s linear infinite;
  animation-delay: ${props => props.$delay}s;
  
  /* 창문 */
  &::before {
    content: '';
    position: absolute;
    width: ${props => props.$isSports ? '18px' : '22px'};
    height: ${props => props.$isSports ? '12px' : '15px'};
    background: #fff;
    border-radius: ${props => props.$isSports ? '3px' : '4px'};
    top: 6px;
    left: ${props => props.$isSports ? '8px' : '6px'};
    box-shadow: ${props => props.$isSports ? '30px 0 0 #fff' : '35px 0 0 #fff'};
  }

  /* 바퀴 */
  &::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    background: #333;
    border-radius: 50%;
    bottom: -8px;
    left: 10px;
    box-shadow: ${props => props.$isSports ? '35px 0 0 #333' : '40px 0 0 #333'};
  }
`;

const Cloud = styled.div<{ $delay: number; top: number }>`
  position: absolute;
  width: 100px;
  height: 40px;
  background: #fff;
  border-radius: 20px;
  top: ${props => props.top}%;
  left: -120px;
  animation: moveCloud 20s linear infinite;
  animation-delay: ${props => props.$delay}s;
  
  &::before, &::after {
    content: '';
    position: absolute;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
  }
  
  &::before {
    width: 50px;
    height: 50px;
    top: -20px;
    left: 15px;
  }
  
  &::after {
    width: 40px;
    height: 40px;
    top: -15px;
    right: 15px;
  }
`;

const RacingBackground = () => {
  return (
    <BackgroundContainer>
      <Car $delay={0} top={20} color="#FF6B6B" $isSports={true} />
      <Car $delay={2} top={40} color="#4ECDC4" />
      <Car $delay={4} top={60} color="#FFD93D" $isSports={true} />
      <Cloud $delay={0} top={5} />
      <Cloud $delay={5} top={15} />
      <Cloud $delay={10} top={25} />
      <Cloud $delay={15} top={35} />
      <Cloud $delay={20} top={45} />
      <Cloud $delay={25} top={55} />
    </BackgroundContainer>
  );
};

export default RacingBackground; 