import React, { createContext } from 'react';

export interface IAuthContext {
  ninjaId: number | null;
  enter?: (login: string, password: string) => void;
}

const defaultContext: IAuthContext = {
  ninjaId: null,
};

export const AuthContext = createContext<IAuthContext>(defaultContext);

export class AuthProvider extends React.Component {
  enter(login: string, password: string) {
    console.log(login, password);
  }

  render() {
    return (
      <AuthContext.Provider value={{ ...defaultContext, enter: this.enter.bind(this) }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
