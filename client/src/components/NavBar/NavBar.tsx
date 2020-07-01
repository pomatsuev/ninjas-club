import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

export const NavBar = () => {
  const auth = useContext(AuthContext);

  return (
    <nav className="navbar">
      <ul className="navbar__ul">
        <li className="navbar__li">
          <Link to="/">FRIENDS CABINET</Link>
        </li>
        {!auth.ninjaId && (
          <li className="navbar__li">
            <Link to="/login">LOGIN</Link>
          </li>
        )}
        {auth.ninjaId && (
          <li className="navbar__li">
            <Link
              to="/logout"
              onClick={() => {
                auth.exit && auth.exit();
              }}
            >
              LOGOUT
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
