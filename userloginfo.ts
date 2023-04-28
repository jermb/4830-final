export class Userloginfo {
    username: string;
    password: string;
}

getIsAuth() {
    return this.isAuthenticated;
  }

getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }