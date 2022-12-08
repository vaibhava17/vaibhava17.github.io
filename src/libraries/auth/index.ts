import { makeAutoObservable, runInAction, flow } from 'mobx';

class ObservableAuthStore {
  user: any = null;

  constructor() {
    makeAutoObservable(this);
  }

  setUser = (user: object) => {
    runInAction(() => {
      this.user = user;
    });
  };

  logout = () => {
    this.user = null;
  };

  login = flow(function* (this: ObservableAuthStore, email: string, password: string) {
    try {
      const response = yield fetch('http://localhost:3000/login', {

        // add path params
        // cors
        // add headers

        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // path params

        body: JSON.stringify({ email, password }),
      });
      const user = yield response.json();
      this.setUser(user);
    } catch (error) {
      console.log(error);
    }
  });
}

const authStore = new ObservableAuthStore();
export default authStore;
