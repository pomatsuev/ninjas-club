import React, { useContext } from 'react';
import { NavBar } from './components/NavBar';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ContentPage } from './components/ContentPage';
import { Login } from './components/Login';
import { AuthContext } from './context/AuthProvider';
import { Registration } from './components/Registration';
import { Frends } from './components/Frends';
import { ErrorMessage } from './components/ErrorsMessage';

export const App = () => {
  const { ninjaId } = useContext(AuthContext);
  return (
    <>
      <NavBar />
      <Switch>
        {!ninjaId ? (
          [
            <Route path="/login" key={0}>
              <ContentPage>
                <Login />
              </ContentPage>
            </Route>,
            <Route path="/registration" key={1}>
              <ContentPage>
                <Registration />
              </ContentPage>
            </Route>,
          ]
        ) : (
          <Route path="/" exact>
            <Frends />
          </Route>
        )}
        <Redirect to={!ninjaId ? '/login' : '/'} />
      </Switch>
      <ErrorMessage />
    </>
  );
};
