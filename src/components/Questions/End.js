import React from 'react';

const End = () => {
  return (
    <div className="end-container">
      <h2 className="end-message">Fim do jogo!</h2>
      <button className="next-button" onClick={() => window.location.reload()}>
        Reiniciar
      </button>
    </div>
  );
};

export default End;