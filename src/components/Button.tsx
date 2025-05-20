import styled from 'styled-components';

const StyledButton = styled.button`
  font-family: 'Gaegu', cursive;
  font-size: 1.5rem;
  font-weight: 700;
  padding: 12px 32px;
  background-color: #FF6B6B;
  color: white;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 0 #FF5252;
  text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.1);
  min-width: 200px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 0 #FF5252;
  }

  &:active {
    transform: translateY(2px);
    box-shadow: 0 2px 0 #FF5252;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: 0 4px 0 #bbb;
  }
`;

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({ children, onClick, disabled }: ButtonProps) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
};

export default Button; 