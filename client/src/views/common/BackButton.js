import React from 'react';
import { useHistory } from 'react-router-dom';

const BackButton = () => {
  const history = useHistory();

  const handleBackClick = () => {
    history.goBack();
  };

  return (
    <button onClick={handleBackClick}>Back</button>
  );
};

export default BackButton;