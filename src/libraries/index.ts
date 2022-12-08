import AuthLibrary from './auth';

class RootLibrary {
  authLibrary: typeof AuthLibrary;
  constructor() {
    this.authLibrary = AuthLibrary;
  }
}

export default RootLibrary;