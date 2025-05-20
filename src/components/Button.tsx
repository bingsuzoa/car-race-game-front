import styled from 'styled-components';

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const StyledButton = styled.button<{ disabled?: boolean }>`
  font-family: 'Gaegu', cursive;
  font-size: 1.2rem;
  font-weight: 700;
  padding: 12px 32px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background: ${props => props.disabled ? '#e0e0e0' : '#4ECDC4'};
  color: ${props => props.disabled ? '#9e9e9e' : '#fff'};
  box-shadow: ${props => props.disabled ? 'none' : '0 4px 6px rgba(0, 0, 0, 0.1)'};

  &:hover {
    transform: ${props => props.disabled ? 'none' : 'translateY(-2px)'};
    box-shadow: ${props => props.disabled ? 'none' : '0 6px 8px rgba(0, 0, 0, 0.15)'};
  }

  &:active {
    transform: ${props => props.disabled ? 'none' : 'translateY(0)'};
    box-shadow: ${props => props.disabled ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.1)'};
  }
`;

const Button = ({ onClick, disabled, children }: ButtonProps) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
};

export default Button; 