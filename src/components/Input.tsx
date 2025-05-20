import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledLabel = styled.label`
  font-family: 'Gaegu', cursive;
  font-size: 1.5rem;
  font-weight: 700;
  color: #4ECDC4;
  margin-bottom: 0.8rem;
  display: block;
  text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.1);
`;

const StyledInput = styled.input`
  font-family: 'Gaegu', cursive;
  font-size: 1.3rem;
  padding: 12px 16px;
  border: 2px solid #4ECDC4;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.95);
  color: #333;
  transition: all 0.3s ease;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  &:focus {
    outline: none;
    border-color: #FF6B6B;
    box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1);
  }

  &::placeholder {
    color: #aaa;
    font-size: 1.1rem;
  }

  /* number 타입 input의 화살표 스타일링 */
  &[type="number"]::-webkit-inner-spin-button,
  &[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
}

const Input = ({ label, value, onChange, type = 'text', placeholder }: InputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'number') {
      const value = e.target.value;
      // 음수 기호나 0으로 시작하는 숫자 입력 방지
      if (value === '-' || value === '0' || value.startsWith('0')) {
        return;
      }
    }
    onChange(e.target.value);
  };

  return (
    <InputContainer>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        min={type === 'number' ? '1' : undefined}
      />
    </InputContainer>
  );
};

export default Input; 