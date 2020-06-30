import React, { useContext } from 'react';
import { NavBar } from './components/NavBar';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ContentPage } from './components/ContentPage';
import { Login } from './components/Login';
import { AuthProvider, AuthContext } from './context/AuthProvider';

export const App = () => {
  const { ninjaId } = useContext(AuthContext);
  return (
    <Router>
      <AuthProvider>
        <NavBar />
        <Switch>
          <Route path="/login">
            <ContentPage>
              <Login />
            </ContentPage>
          </Route>
          {ninjaId && (
            <Route path="/" exact>
              <h1>NINJA</h1>
            </Route>
          )}
          <Redirect to="/login" />
        </Switch>
      </AuthProvider>
    </Router>
  );
};
