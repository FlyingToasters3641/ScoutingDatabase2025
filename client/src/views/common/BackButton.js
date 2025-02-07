import React from 'react';
import { useHistory } from 'react-router-dom';
import { RiArrowGoBackFill } from "react-icons/ri";

const BackButton = () => {
  const history = useHistory();

  const handleBackClick = () => {
    history.goBack();
  };

  return (
    <button onClick={handleBackClick} className="btn btn-primary"><RiArrowGoBackFill /> Back</button>
  );
};

export default BackButton;