export class User {
  constructor(email: string, username: string, password: string) {
    this.email = email;
    this.username = username;
    this.password = password;
  }
  id: string;
  email: string;
  username: string;
  password: string;
  verified: boolean;
}
