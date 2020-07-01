import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

export const ErrorMessage: React.FC = () => {
  const { error, clear } = useContext(AuthContext);
  if (error) {
    return (
      <div className="modal">
        <div className="modal__box">
          <div className="modal__text">{error}</div>
          <button
            className="modal__button"
            onClick={() => {
              clear && clear();
            }}
          >
            CLOSE
          </button>
        </div>
      </div>
    );
  } else {
    return <span></span>;
  }
};
