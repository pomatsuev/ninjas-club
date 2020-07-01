import React, { createContext } from 'react';
import { History } from 'history';
import axios from 'axios';

export interface IAuthState {
  ninjaId: number | null;
  ninjaFullName: string;
  error: string;
}
export interface IAuthContext extends IAuthState {
  enter?: (login: string, password: string) => void;
  registration?: (login: string, fullName: string, password: string, history: History) => void;
  exit?: () => void;
  clear?: () => void;
}

const defaultContext: IAuthContext = {
  ninjaId: null,
  ninjaFullName: '',
  error: '',
};

export const AuthContext = createContext<IAuthContext>(defaultContext);

const axisInstase = axios.create({
  validateStatus: (status) => {
    return status >= 200 && status <= 403;
  },
});

export class AuthProvider extends React.Component {
  state: IAuthState = {
    // !!! we can add JWT and save his in localStorage or we can set coockie session httpOnly
    ninjaId: null,
    ninjaFullName: '',
    error: '',
  };

  enter(login: string, password: string) {
    if (login && password) {
      axisInstase.post('/api/login', { login, pass: password }).then((res) => {
        if (res.status === 200) {
          this.setState((old) => ({ ninjaId: res.data.id, ninjaFullName: res.data.fullName }));
        } else {
          this.setState({ error: res.data.message });
        }
      });
    } else {
      this.setState({ error: 'Empty fields!' });
    }
  }

  exit() {
    this.setState(defaultContext);
  }

  registration(login: string, fullName: string, password: string, history: History) {
    if (login && password && fullName) {
      axisInstase.post('/api/reg', { login, fullName, pass: password }).then((res) => {
        if (res.status === 201) {
          history.push('/login');
        } else {
          console.log('fasdfs');
          this.setState({ error: res.data.message });
        }
      });
    } else {
      this.setState({ error: 'Empty fields!' });
    }
  }

  clear() {
    this.setState({ error: '' });
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          enter: this.enter.bind(this),
          exit: this.exit.bind(this),
          registration: this.registration.bind(this),
          clear: this.clear.bind(this),
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
