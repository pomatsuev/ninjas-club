import React, { useContext, useRef } from 'react';
import LOGO from '../../assets/ninja.svg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
export const Login: React.FC = () => {
  const { enter } = useContext(AuthContext);
  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  return (
    <div className="content__block content__block_400">
      <img className="logo" src={LOGO} height={200} alt="where is ninja? o_O" />
      <div className="content__caption">ENTER YOUR NAME! NINJA!</div>
      <form
        className="content__form"
        onSubmit={(e) => {
          e.preventDefault();
          enter && enter(loginRef.current?.value || '', passwordRef.current?.value || '');
        }}
      >
        <div className="row">
          <div className="row__caption">LOGIN:</div>
          <input type="text" ref={loginRef} />
        </div>
        <div className="row">
          <div className="row__caption">PASSWORD:</div>
          <input type="password" ref={passwordRef} />
        </div>
        <div className="flex row row__flex">
          <button className="flex__button">ENTER</button>
        </div>
        <div className="row">
          <div className="row__caption">
            IF YOU WANT TO JOIN NINJA'S CLUB CLICK{' '}
            <Link className="link" to="/registration">
              HERE
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
