export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
}

export interface LoginForm {
  password: string;
  email: string;
}
