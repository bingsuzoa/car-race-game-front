import styled from 'styled-components';

interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'number';
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

const StyledInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: #007bff;
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

const Input = ({ label, value, onChange, placeholder, type = 'text' }: InputProps) => {
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
      <Label>{label}</Label>
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