import React from 'react';
import './Home.css'; // Importa os estilos para o componente Home
//import { useHistory}  from 'react-router-dom';

import startImage from '../images/pngwing.com.png'; // Importa a imagem de início

import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/questions');
  };

  return (
    <div className="home-container">
      <h1>Tecido Osseo</h1>
      <img
        src={startImage}
        alt="Imagem Iniciar"
        onClick={handleStartClick}
      />
      <p onClick={handleStartClick}>Iniciar</p>
    </div>
  );
};


export default Home;