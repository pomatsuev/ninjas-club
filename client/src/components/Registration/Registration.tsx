import React, { useContext, useRef } from 'react';
import LOGO from '../../assets/ninja.svg';
import { AuthContext } from '../../context/AuthProvider';
import { useHistory } from 'react-router-dom';

export const Registration: React.FC = () => {
  const { registration } = useContext(AuthContext);
  const history = useHistory();
  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  return (
    <div className="content__block content__block_400">
      <img className="logo" src={LOGO} height={200} alt="where is ninja? o_O" />
      <div className="content__caption">ACCEPT CODEX OF NINJA!</div>
      <form
        className="content__form"
        onSubmit={(e) => {
          e.preventDefault();
          registration &&
            registration(
              loginRef.current?.value || '',
              nameRef.current?.value || '',
              passwordRef.current?.value || '',
              history
            );
        }}
      >
        <div className="row">
          <div className="row__caption">LOGIN:</div>
          <input type="text" ref={loginRef} />
        </div>
        <div className="row">
          <div className="row__caption">YOUR NAME:</div>
          <input type="text" ref={nameRef} />
        </div>
        <div className="row">
          <div className="row__caption">PASSWORD:</div>
          <input type="password" ref={passwordRef} />
        </div>
        <div className="flex row row__flex">
          <button className="flex__button">registration</button>
        </div>
      </form>
    </div>
  );
};
