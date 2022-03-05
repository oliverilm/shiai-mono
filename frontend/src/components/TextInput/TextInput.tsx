import React from 'react';
import './TextInput.style.css';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange?: (e: any) => void;
}

const TextInput: React.FC<Props> = ({ ...rest }) => <input {...rest} />;

export default TextInput;
