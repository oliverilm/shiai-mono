import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return <ArrowBack onClick={() => navigate(-1)} />;
};

export default BackButton;
